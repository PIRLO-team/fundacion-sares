import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { dataSource } from './config/ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT || 3000;

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
