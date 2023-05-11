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
}