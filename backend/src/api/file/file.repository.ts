import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HandlersError } from '../../shared/handlers/error.utils';
import { File } from './entities/file.entity';

@Injectable()
export class FileRepository extends Repository<File>{
    constructor(
        private dataSource: DataSource,
        private readonly _handlersError: HandlersError
    ) {
        super(File, dataSource.createEntityManager());
    }
}