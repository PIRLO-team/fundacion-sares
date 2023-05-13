import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { NonConsumableCategory } from '../entities/non-consumable-category.entity';

@Injectable()
export class NonConsumableCategoryRepository extends Repository<NonConsumableCategory>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(NonConsumableCategory, dataSource.createEntityManager());
    }
}