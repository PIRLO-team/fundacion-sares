import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { SupplyType } from '../entities/supply-type.entity';

@Injectable()
export class SupplyTypeRepository extends Repository<SupplyType>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(SupplyType, dataSource.createEntityManager());
    }
}