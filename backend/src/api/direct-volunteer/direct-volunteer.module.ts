import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DirectVolunteerService } from './direct-volunteer.service';
import { DirectVolunteerController } from './direct-volunteer.controller';
import { JwtMiddleware } from 'src/auth/middleware/jwt.middleware';
import { DirectVolunteerRepository } from './direct-volunteer.repository';
import { HandlersError } from '../../shared/handlers/error.utils';

@Module({
  controllers: [DirectVolunteerController],
  providers: [
    DirectVolunteerService,
    HandlersError,
    DirectVolunteerRepository,
  ]
})
export class DirectVolunteerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/api/direct-volunteer/*', method: RequestMethod.ALL });
  }
}
