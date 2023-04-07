import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(User, dataSource.createEntityManager());
    }
}