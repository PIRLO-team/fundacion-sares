import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { Supply } from '../entities/supply.entity';

@Injectable()
export class SupplyRepository extends Repository<Supply>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(Supply, dataSource.createEntityManager());
    }
}