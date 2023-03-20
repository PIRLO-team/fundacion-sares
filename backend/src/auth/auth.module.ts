import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { HandlersError } from '../shared/handlers/error.utils';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    HandlersError
  ],
  exports: [AuthService]
})
export class AuthModule { }
