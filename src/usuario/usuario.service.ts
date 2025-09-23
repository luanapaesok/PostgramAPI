import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entity/usuario.entity";
import { Repository } from "typeorm";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UpdateUsuarioDTO } from "./dto/update-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioEntity: Repository<Usuario>
    ) { }

    async verificarSeExistePeloID(id: number) {
        if (!(await this.usuarioEntity.exists({
            where: { id }
        }))) {
            throw new BadRequestException(`Usuário com id ${id} não encontrado.`)
        }
    }

    create(data: CreateUsuarioDTO) {
        let user = this.usuarioEntity.create(data);
        return this.usuarioEntity.save(user)
    }

    getAll() {
        return this.usuarioEntity.find({
            relations: ["posts"]
        });
    }

    async getByID(id: number) {
        await this.verificarSeExistePeloID(id);

        return await this.usuarioEntity.findOne({
            where: { id },
            relations: ["posts"]
        });
    }

    async delete(id: number) {
        return this.usuarioEntity.delete(id)
    }

    update(updateUserDto: UpdateUsuarioDTO) {
        return this.usuarioEntity.update(updateUserDto.id, updateUserDto);
    }
}