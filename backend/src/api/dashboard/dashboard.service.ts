import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../../shared/handlers/error.utils';
import { UserRepository } from '../../auth/repository/user.repository';
import { DirectVolunteerRepository } from '../direct-volunteer/direct-volunteer.repository';
import { SupplyCategoryRepository } from '../supply/repositories/supply-category.repository';
import { NonConsumableRepository } from '../supply/repositories/non-consumable.repository';
import { SupplyRepository } from '../supply/repositories/supply.repository';
import { Supply } from '../supply/entities';
import { LessThanOrEqual } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _userRepository: UserRepository,
    private readonly _directVolunteerRepository: DirectVolunteerRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _nonConsumableRepository: NonConsumableRepository,
    private readonly _supplyRepository: SupplyRepository,
  ) {}

  async findDataDashboard() {
    try {
      const userCount = await this.userData();
      const volunteerCount = await this.directVolunteerData();
      const supplyCategoryData = await this.supplyCategoryData();
      const nonConsumableData = await this.nonConsumableData();
      const expiredSupplyData = await this.expiredSupplyData();

      return {
        response: {
          userCount,
          volunteerCount,
          supplyCategoryData,
          nonConsumableData,
          expiredSupplyData,
        },
        title: 'Información del dashboard',
        message:
          'Información detallada sobre las diferentes secciones del aplicativo',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async userData() {
    try {
      const userData = this._userRepository.userData();

      return userData;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async directVolunteerData() {
    try {
      const directVolunteerData = this._directVolunteerRepository.count({
        where: {
          is_active: true,
        },
      });

      if (!directVolunteerData) {
        return [];
      }

      return directVolunteerData;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async supplyCategoryData() {
    try {
      const supplyCategoryData =
        this._supplyCategoryRepository.supplyCategoryData();

      return supplyCategoryData;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async nonConsumableData() {
    try {
      const nonConsumableData =
        this._nonConsumableRepository.nonConsumableData();

      return nonConsumableData;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
  async expiredSupplyData() {
    try {
      // const expiredSupplyData: Supply[] = await this._supplyRepository.find({
      //   // select: [
      //   //   'supply_id',
      //   //   'categoryBySupply'
      //   // ],
      //   where: {
      //     is_active: true,
      //     expiration_date: LessThanOrEqual(new Date()),
      //   },
      //   relations: [
      //     'supplyCategory',
      //     'categoryBySupply',
      //     'providerSupply',
      //     'acquisitionTypeSupply',
      //   ],
      // });

      const expiredSupplyData: Supply[] = await this._supplyRepository
        .createQueryBuilder('supply')
        .select([
          'supply.supply_id',
          'categoryBySupply.supply_category_name',
          'categoryBySupply.quantity',
          'supply.expiration_date',
        ])
        .leftJoin('supply.categoryBySupply', 'categoryBySupply')
        .where('supply.is_active = :isActive', { isActive: true })
        .andWhere('supply.expiration_date <= :today', { today: new Date() })
        .getMany();

      return expiredSupplyData;
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
