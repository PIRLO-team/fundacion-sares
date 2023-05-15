import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { DiscountNonConsumable } from '../entities/discount-non-consumable.entity';

@Injectable()
export class DiscountNonConsumableRepository extends Repository<DiscountNonConsumable>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(DiscountNonConsumable, dataSource.createEntityManager());
    }
}