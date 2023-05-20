import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { NonConsumable } from '../entities/non-consumable.entity';

@Injectable()
export class NonConsumableRepository extends Repository<NonConsumable>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(NonConsumable, dataSource.createEntityManager());
    }

    async nonConsumableData(){
        try {
            const nonConsumableQuery = `
            SELECT
                ncc.non_consumable_category_supply_name AS name,
                nc.non_consumable_id
            FROM
                non_consumable nc
                LEFT JOIN non_consumable_category ncc ON ncc.non_consumable_category_supply_id = nc.non_consumable_category_supply_id
            WHERE
                nc.is_active = TRUE;
            `;
    
            const nonConsumableData = await this.dataSource.query(nonConsumableQuery);
    
            if(!nonConsumableData.length) {
                return [];
            }
    
            return nonConsumableData;
        } catch (error) {
          throw this._handlersError.returnErrorRepository({
            className: NonConsumableRepository.name,
            error: error,
            debug: true,
          });
        }
    }
}