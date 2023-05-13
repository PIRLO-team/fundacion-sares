import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../../shared/handlers/error.utils';
import { AcquisitionType } from '../entities/acquisition-type.entity';

@Injectable()
export class AcquisitionTypeRepository extends Repository<AcquisitionType>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(AcquisitionType, dataSource.createEntityManager());
    }
}