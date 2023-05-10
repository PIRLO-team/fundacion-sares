import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { HandlersError } from '../../shared/handlers/error.utils';
import { UserRepository } from '../../auth/repository/user.repository';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FileController],
  providers: [
    FileService,
    HandlersError,
    FileRepository,
    UserRepository
  ]
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        {
          path: '/api/file/*',
          method: RequestMethod.ALL
        }
      );
  }
}