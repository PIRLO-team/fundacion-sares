import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { ProviderRepository } from './provider.repository';
import { HandlersError } from '../../shared/handlers/error.utils';

@Module({
  controllers: [ProviderController],
  providers: [
    ProviderService,
    HandlersError,
    ProviderRepository
  ]
})
export class ProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        {
          path: '/api/provider', 
          method: RequestMethod.ALL
        },
        {
          path: '/api/provider/*', 
          method: RequestMethod.ALL
        }
      );
  }
}
