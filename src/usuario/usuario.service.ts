import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entity/usuario.entity";
import { Repository } from "typeorm";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdateUsuarioDTO } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>
    ) { }

    async verificarSeExistePeloID(id: number) {
        if (!(await this.usuarioRepository.exists({
            where: { id }
        }))) {
            throw new BadRequestException(`Usuário com id ${id} não encontrado.`)
        }
    }

    async create(data: CreateUsuarioDTO) {
        if (await this.usuarioRepository.exists({
            where: {
                email: data.email
            }
        })) {
            throw new BadRequestException("Este e-mail já está cadastrado.");
        }

        let user = this.usuarioRepository.create(data);
        return this.usuarioRepository.save(user)
    }

    getAll() {
        return this.usuarioRepository.find({
            relations: ["posts"]
        });
    }

    async getByID(id: number) {
        await this.verificarSeExistePeloID(id);

        return await this.usuarioRepository.findOne({
            where: { id },
            relations: ["posts"]
        });
    }

    async delete(id: number) {
        return this.usuarioRepository.delete(id)
    }

    async update(updateUserDto: UpdateUsuarioDTO) {
        return this.usuarioRepository.update(updateUserDto.id, updateUserDto);

        // const user = await this.getByID(updateUserDto.id)

        // const teste = await this.usuarioRepository.exists({
        //     where: {
        //         email: updateUserDto.email
        //     }
        // })
        // console.log(teste)
        // if(!teste){
        //     return this.usuarioRepository.update(updateUserDto.id, updateUserDto);
        // } else {
        //     throw new BadRequestException("Este e-mail já existe.")
        // }
    }
}