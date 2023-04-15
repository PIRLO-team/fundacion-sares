import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './repository/user.repository';
import { HandlersError } from '../shared/handlers/error.utils';
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random-code.utils';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { JwtStrategy } from './jwt.strategy';
import { PasswordGeneratorService } from './utils/random-password.utils';
import { RoleRepository } from './repository/role.repository';

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
    UserRepository,
    RoleRepository,
    HandlersError,
    BcryptPasswordEncoder,
    PasswordGeneratorService,
    ResetCodeSnippet,
    JwtMiddleware,
    JwtStrategy
  ],
  exports: [
    AuthService,
    UserRepository
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/auth/register',
      method: RequestMethod.POST
    });
  }
}
