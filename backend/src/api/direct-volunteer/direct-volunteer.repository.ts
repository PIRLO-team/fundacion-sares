import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';
import { DirectVolunteer } from './entities/direct-volunteer.entity';

@Injectable()
export class DirectVolunteerRepository extends Repository<DirectVolunteer>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(DirectVolunteer, dataSource.createEntityManager());
    }
}