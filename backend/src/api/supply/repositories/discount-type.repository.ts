import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { DiscountType } from '../entities/discount-type.entity';

@Injectable()
export class DiscountTypeRepository extends Repository<DiscountType>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(DiscountType, dataSource.createEntityManager());
    }
}