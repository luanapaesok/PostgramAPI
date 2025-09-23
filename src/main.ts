import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  app.enableCors({
    origin: ['http://localhost:4200', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: 'X-CSRF-TOKEN, X-Requested-With, Content-Type, Authorization', // Headers permitidos
    credentials: true, // Permite o envio de cookies, tokens, etc.
    exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  })
  await app.listen(3000);
}
bootstrap();
