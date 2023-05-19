import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private readonly _handlersError: HandlersError,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async userData() {
    try {
      const userCountQuery = `
        SELECT
            role.role_name,
            user.user_role,
            COUNT(*) AS user_count
        FROM
            user
            LEFT JOIN role ON user.user_role = role.role_id
        WHERE
            user.is_active = TRUE
        GROUP BY
            user_role
        ORDER BY
            role.role_id ASC;
    `;

      const userCount = await this.dataSource.query(userCountQuery);

      if (!userCount.length) {
        return [];
      }

      return userCount;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: UserRepository.name,
        error: error,
        debug: true,
      });
    }
  }
}
