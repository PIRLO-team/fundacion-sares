import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(Role, dataSource.createEntityManager());
    }
}