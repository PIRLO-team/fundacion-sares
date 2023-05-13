import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { DiscountSupply } from '../entities/discount-supply.entity';

@Injectable()
export class DiscountSupplyRepository extends Repository<DiscountSupply>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(DiscountSupply, dataSource.createEntityManager());
    }
}