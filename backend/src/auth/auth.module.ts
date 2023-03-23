import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { HandlersError } from '../shared/handlers/error.utils';
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random.utils';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    HandlersError,
    BcryptPasswordEncoder,
    ResetCodeSnippet
  ],
  exports: [AuthService]
})
export class AuthModule { }
