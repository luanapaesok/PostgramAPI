import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    private audience = "audience";
    private issuer = "issuer";

    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ) { }

    createToken(user: Usuario) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email,
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: "12h",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    async signin(email: string, password: string) {
        const user = await this.usuarioService.findByEmail(email)

        if (!user) {
            throw new ConflictException("Email ou senha incorretos.");
        }

        if (! await bcrypt.compare(password, user.password)) {
            throw new ConflictException("Email ou senha incorretos.");
        }

        return this.createToken(user);
    }
}