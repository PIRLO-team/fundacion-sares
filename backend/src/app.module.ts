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
import { User } from './auth/entities/user.entity';
import { Role } from './auth/entities/role.entity';
import { UsersModule } from './api/users/users.module';
import { DirectVolunteerModule } from './api/direct-volunteer/direct-volunteer.module';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forRoot({
      ...dataSource.options,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      entities: [
        User,
        Role
      ]
    }),
    RouterModule.register(MainRoutes),
    AuthModule,
    UsersModule,
    DirectVolunteerModule,
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
        from: 'juan_man.molina@uao.edu.co',
      },
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    Repository
  ],
})
export class AppModule { }
