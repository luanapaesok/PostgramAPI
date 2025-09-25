import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entity/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { Post } from './post/entity/post.entity';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'usuarios',
      entities: [Usuario, Post],
      synchronize: true,
    }),
    UsuarioModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot( {isGlobal: true}  )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
