import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    JwtModule.register({
      secret: String(process.env.JWT_SECRET)
    }),
    UsuarioModule, TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [AuthController],
  providers: [AuthService, Usuario, UsuarioService],
  exports: [AuthService]
})
export class AuthModule { }
