import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';

@Module({
  controllers: [SupplyController],
  providers: [SupplyService]
})
export class SupplyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        {
          path: '/api/supply',
          method: RequestMethod.ALL
        },
        {
          path: '/api/supply/*',
          method: RequestMethod.ALL
        }
      );
  }
}
