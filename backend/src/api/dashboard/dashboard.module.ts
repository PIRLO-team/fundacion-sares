import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { HandlersError } from '../../shared/handlers/error.utils';
import { UserRepository } from '../../auth/repository/user.repository';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { DirectVolunteerRepository } from '../direct-volunteer/direct-volunteer.repository';
import { SupplyCategoryRepository } from '../supply/repositories/supply-category.repository';
import { NonConsumableRepository } from '../supply/repositories/non-consumable.repository';
import { SupplyRepository } from '../supply/repositories/supply.repository';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    HandlersError,
    UserRepository,
    DirectVolunteerRepository,
    SupplyCategoryRepository,
    NonConsumableRepository,
    SupplyRepository
  ]
})
export class DashboardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        {
          path: '/api/dashboard', 
          method: RequestMethod.ALL
        },
        {
          path: '/api/dashboard/*', 
          method: RequestMethod.ALL
        }
      );
  }
}
