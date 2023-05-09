import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { Supply } from './entities/supply.entity';
import { SupplyCategory } from './entities/supply-category.entity';
import { SupplyType } from './entities/supply-type.entity';
import { Provider } from '../provider/entities/provider.entity';

@Module({
  controllers: [SupplyController],
  providers: [
    SupplyService,
    Provider
  ]
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
