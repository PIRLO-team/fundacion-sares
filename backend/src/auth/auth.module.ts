import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { HandlersError } from '../shared/handlers/error.utils';
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random-code.utils';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { JwtStrategy } from './jwt.strategy';
import { PasswordGeneratorService } from './utils/random-password.utils';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: 28800 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    HandlersError,
    BcryptPasswordEncoder,
    PasswordGeneratorService,
    ResetCodeSnippet,
    JwtMiddleware,
    JwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }
