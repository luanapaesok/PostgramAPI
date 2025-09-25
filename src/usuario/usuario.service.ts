import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entity/usuario.entity";
import { Repository } from "typeorm";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdateUsuarioDTO } from "./dto/update-usuario.dto";
import * as bcrypt from "bcrypt";

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
        //verifica se o usuário já existe
        if (await this.usuarioRepository.exists({
            where: {
                email: data.email
            }
        })) {
            throw new ConflictException("Este e-mail já está cadastrado.");
        }

        //faz criptografia da senha
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        data.posts = [];

        //cria e salva usuário
        const user = this.usuarioRepository.create(data);
        return this.usuarioRepository.save([user]);
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

    async findByEmail(email: string){
        return await this.usuarioRepository.findOneBy({
            email
        })
    }
}