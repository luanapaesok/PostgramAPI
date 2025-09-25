import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private audience = "audience";
    private issuer = "issuer";

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    createToken(user: User) {
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
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new ConflictException("Este e-mail já está cadastrado.");
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new ConflictException("Este e-mail já está cadastrado.");
        }

        return this.createToken(user);
    }
}