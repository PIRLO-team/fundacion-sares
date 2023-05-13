import { Module } from '@nestjs/common';
import { APP_FILTER, RouterModule } from '@nestjs/core';
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
import { HttpExceptionFilter } from './shared/handlers/error.exception';
import { FileModule } from './api/file/file.module';
import { File } from './api/file/entities/file.entity';
import { DirectVolunteer } from './api/direct-volunteer/entities/direct-volunteer.entity';
import { Provider } from './api/provider/entities/provider.entity';
import { ProviderModule } from './api/provider/provider.module';
import { Supply } from './api/supply/entities/supply.entity';
import { SupplyModule } from './api/supply/supply.module';
import { JwtMiddleware } from './auth/middleware/jwt.middleware';
import { SupplyCategory } from './api/supply/entities/supply-category.entity';
import { SupplyType } from './api/supply/entities/supply-type.entity';
import { CategoryBySupply } from './api/supply/entities/category-by-supply.entity';
import { NonConsumable } from './api/supply/entities/non-consumable.entity';
import { AcquisitionType } from './api/supply/entities/acquisition-type.entity';
import { NonConsumableStatus } from './api/supply/entities/non-consumable-status.entity';
import { DiscountSupply } from './api/supply/entities/discount-supply.entity';
import { DiscountType } from './api/supply/entities/discount-type.entity';
import { NonConsumableCategory } from './api/supply/entities/non-consumable-category.entity';

@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forRoot({
      ...dataSource.options,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      entities: [
        User,
        Role,
        File,
        DirectVolunteer,
        Provider,
        Supply,
        SupplyCategory,
        SupplyType,
        CategoryBySupply,
        AcquisitionType,
        NonConsumable,
        NonConsumableStatus,
        NonConsumableCategory,
        DiscountSupply,
        DiscountType,
      ]
    }),
    RouterModule.register(MainRoutes),
    AuthModule,
    UsersModule,
    DirectVolunteerModule,
    FileModule,
    ProviderModule,
    SupplyModule,
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
        from: env.SMTP_FROM,
      },
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    Repository,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
