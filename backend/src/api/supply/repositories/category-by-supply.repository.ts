import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { CategoryBySupply } from '../entities/category-by-supply.entity';

@Injectable()
export class CategoryBySupplyRepository extends Repository<CategoryBySupply>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(CategoryBySupply, dataSource.createEntityManager());
    }
}