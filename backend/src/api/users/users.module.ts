import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { HandlersError } from 'src/shared/handlers/error.utils';

@Module({
  controllers: [UsersController],
  imports: [AuthModule],
  providers: [
    UsersService,
    HandlersError
  ]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/api/user/*', method: RequestMethod.ALL });
  }
}
