import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { dataSource } from './config/ormconfig';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = env.PORT || 3000;

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  await dataSource
    .initialize()
    .then(() => {
      console.log(`🚀 ~ file: main.ts:13 ~ dataSource ~ Connected to MySQL server in ${env.DB_HOST}`);
    })
    .catch(e => {
      console.log('🚀 ~ file: main.ts:16 ~ dataSource ~ e:', e)
    });

  await app.listen(port);
  console.log(`🚀 ~ Server up on port ${port}`)
}
bootstrap();
