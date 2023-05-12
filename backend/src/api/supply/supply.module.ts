import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SupplyCategoryService } from './supply-category.service';
import { SupplyController } from './supply.controller';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { Provider } from '../provider/entities/provider.entity';
import { HandlersError } from '../../shared/handlers/error.utils';
import { SupplyCategoryRepository } from './repositories/supply-category.repository';
import { SupplyRepository } from './repositories/supply.repository';
import { SupplyTypeRepository } from './repositories/supply-type.repository';
import { NonConsumableRepository } from './repositories/non-consumable.repository';
import { NonConsumableStatusRepository } from './repositories/non-consumable-status.repository';
import { CategoryBySupplyRepository } from './repositories/category-by-supply.repository';
import { AcquisitionTypeRepository } from './repositories/acquisition-type.repository';
import { SupplyService } from './supply.service';
import { DiscountSupplyRepository } from './repositories/discount-supply.repository';
import { DiscountTypeRepository } from './repositories/discount-type.repository';

@Module({
  controllers: [SupplyController],
  providers: [
    HandlersError,
    SupplyCategoryService,
    SupplyService,
    Provider,
    SupplyRepository,
    SupplyCategoryRepository,
    SupplyTypeRepository,
    NonConsumableRepository,
    NonConsumableStatusRepository,
    CategoryBySupplyRepository,
    AcquisitionTypeRepository,
    DiscountSupplyRepository,
    DiscountTypeRepository
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
