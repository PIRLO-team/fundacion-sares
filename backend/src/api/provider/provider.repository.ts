import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderRepository extends Repository<Provider>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(Provider, dataSource.createEntityManager());
    }
}