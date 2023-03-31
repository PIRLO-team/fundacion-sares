import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSource } from './config/ormconfig';
import { MainRoutes } from './main.routes';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from 'process';

@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forRoot({
      ...dataSource.options,
      keepConnectionAlive: true,
      autoLoadEntities: true
    }),
    RouterModule.register(MainRoutes),
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT),
        secure: false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      },
      defaults: {
        from: 'sares@fundacion.com',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
  ],
})
export class AppModule {}
