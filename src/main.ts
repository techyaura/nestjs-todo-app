import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootsrapping---Application');
  // configure swagger
  const config = new DocumentBuilder()
    .setTitle('TODO APP')
    .setDescription('Todo App created using nestJs & Postgres DB')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
