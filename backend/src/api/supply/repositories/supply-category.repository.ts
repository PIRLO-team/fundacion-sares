import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SupplyCategory } from '../entities/supply-category.entity';
import { HandlersError } from '../../../shared/handlers/error.utils';

@Injectable()
export class SupplyCategoryRepository extends Repository<SupplyCategory>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(SupplyCategory, dataSource.createEntityManager());
    }
}