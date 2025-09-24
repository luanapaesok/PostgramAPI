import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
        const validatdeUser = await this.usuarioRepository.findOne({
            where: {
                email: data.email
            }
        });

        if (validatdeUser) {
            throw new ConflictException("Este e-mail já existe no sistema.");
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
        const user = await this.usuarioRepository.findOne({
            where: {
                email: updateUserDto.email
            }
        });

        //se o usuario for encontrado e o email e pertencer a outro id
        if (user && user.id !== updateUserDto.id) {
            throw new ConflictException("Este e-mail já existe no sistema.");
        }

        return this.usuarioRepository.update(updateUserDto.id, updateUserDto);
    }
}