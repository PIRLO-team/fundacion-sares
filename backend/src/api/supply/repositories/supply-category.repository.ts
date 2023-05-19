import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SupplyCategory } from '../entities/supply-category.entity';
import { HandlersError } from '../../../shared/handlers/error.utils';

@Injectable()
export class SupplyCategoryRepository extends Repository<SupplyCategory> {
  constructor(
    private dataSource: DataSource,
    private readonly _handlersError: HandlersError,
  ) {
    super(SupplyCategory, dataSource.createEntityManager());
  }

  async supplyCategoryData() {
    try {
        const supplyCategoryCountQuery = `
        SELECT
            DISTINCT sc.supply_name AS name,
            GROUP_CONCAT(cbs.supply_category_name SEPARATOR '; ') AS categories,
            GROUP_CONCAT(s.quantity SEPARATOR '; ') AS quantity
        FROM
            supply s
            LEFT JOIN supply_category sc ON sc.supply_id = s.supply_category_id
            LEFT JOIN category_by_supply cbs ON cbs.supply_category_id = s.category_by_supply_id
        WHERE
            s.is_active = TRUE
        GROUP BY
        sc.supply_id;
        `;

        const supplyCategoryCount = await this.dataSource.query(supplyCategoryCountQuery);

        if(!supplyCategoryCount.length) {
            return [];
        }

        return supplyCategoryCount;
    } catch (error) {
      throw this._handlersError.returnErrorRepository({
        className: SupplyCategoryRepository.name,
        error: error,
        debug: true,
      });
    }
  }
}
