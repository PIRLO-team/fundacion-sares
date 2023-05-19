import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../../shared/handlers/error.utils';
import { UserRepository } from '../../auth/repository/user.repository';
import { DirectVolunteerRepository } from '../direct-volunteer/direct-volunteer.repository';
import { SupplyCategoryRepository } from '../supply/repositories/supply-category.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _userRepository: UserRepository,
    private readonly _directVolunteerRepository: DirectVolunteerRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
  ) {}

  async findDataDashboard() {
    try {
      const userCount = await this.userData();
      const volunteerCount = await this.directVolunteerData();
      const supplyCategoryData = await this.supplyCategoryData();

      return {
        response: {
          userCount,
          volunteerCount,
          supplyCategoryData
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
}
