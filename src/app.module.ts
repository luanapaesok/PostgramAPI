import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entity/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { Post } from './post/entity/post.entity';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entity/user.entity';

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
      entities: [Usuario, Post, User],
      synchronize: true,
    }),
    UsuarioModule,
    PostModule,
    UsersModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot( {isGlobal: true}  )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
