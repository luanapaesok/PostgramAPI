import { Body, Controller, Post, Get, Param, Delete, Patch } from "@nestjs/common";
import { CreateUsuarioDTO } from "./dto/create-usuario.dto";
import { UsuarioService } from "./usuario.service";
import { UpdateUsuarioDTO } from "./dto/update-usuario.dto";

@Controller('usuarios')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) { }


    @Get('')
    get() {
        return this.usuarioService.getAll();
    }

    @Get(':id')
    getByID(@Param('id') id: number) {
        return this.usuarioService.getByID(id)
    }

    @Post('')
    create(@Body() data: CreateUsuarioDTO) {
        return this.usuarioService.create(data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usuarioService.delete(id);
    }

    @Patch(':id')
    update(@Body() updateUserDto: UpdateUsuarioDTO) {
        return this.usuarioService.update(updateUserDto);
    }
}