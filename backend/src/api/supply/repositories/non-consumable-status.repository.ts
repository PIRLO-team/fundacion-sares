import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { NonConsumable } from '../entities/non-consumable.entity';
import { NonConsumableStatus } from '../entities/non-consumable-status.entity';

@Injectable()
export class NonConsumableStatusRepository extends Repository<NonConsumableStatus>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(NonConsumableStatus, dataSource.createEntityManager());
    }
}