import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../shared/handlers/error.utils';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _handlerError: HandlersError,
    private readonly _bcryp: BcryptPasswordEncoder,
    private readonly _resetCodeSnippet: ResetCodeSnippet,
  ) { }

  async register(CreateAuthDto: CreateAuthDto) {
    try {
      return {
        response: { valid: false },
        title: '❌ Campos vacios!',
        message: 'Por favor ingrese todos los datos',
        status: HttpStatus.BAD_REQUEST
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async logIn(LogInCredentialDto: LogInCredentialDto): Promise<any> {
    try {
      const user = LogInCredentialDto.user;
      const password = LogInCredentialDto.password;

      if (!(user || password)) {
        return {
          response: { valid: false },
          title: '❌ Campos vacios!',
          message: 'Por favor ingrese todos los datos',
          status: HttpStatus.BAD_REQUEST
        }
      }

      const userExists = await this._authRepository
        .createQueryBuilder('user')
        .where('user.email = :user OR user.username = :user', { user })
        .getMany();

      if (!userExists?.length) {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El usuario ingresado ${user} no coincide, por favor verifica los datos`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const isNewUser: boolean = userExists[0].new_user;
      if (isNewUser === true) {
        const createCode = await this._resetCodeSnippet.randomCode();
        const userId: number = userExists[0].user_id;
        const insertCode = await this._authRepository.update(userId, { code: createCode });

        return {
          response: {
            new_user: isNewUser,
            user_id: userId,
            code: insertCode,
          },
          title: '👋🏻 Bienvenido a la Fundación S.A.R.E.S!',
          message: 'Por favor cambia tu contraseña',
          status: HttpStatus.TEMPORARY_REDIRECT
        }
      }

      const userPassword: string = userExists[0].password;
      const valid: boolean = this._bcryp.matches(
        userPassword,
        password
      );

      if (valid) {
        return {
          response: { valid: true },
          title: '👋🏻 Bienvenido!',
          message: 'Hola de vuelta a la Fundación S.A.R.E.S.',
          status: HttpStatus.OK
        }
      } else {
        return {
          response: { valid: false },
          title: '❌ Verifa tus datos!',
          message: 'Autenticación fallida, por favor verifica que sean los correctos',
          status: HttpStatus.BAD_REQUEST
        }
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async resetPassword(user: number, code: string, UpdateAuthDto: UpdateAuthDto) {
    try {
      const password: string = UpdateAuthDto.password;
      const confirmPassword: string = UpdateAuthDto.confirmPassword;
      const userExists: User = await this._authRepository.findOneBy({ user_id: user });

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El usuario no coincide, por favor contactate con el administrator del aplicativo`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const userCode: number = userExists.code;
      const incomingCode: number = parseInt(code);
      if (userCode === incomingCode) {
        if (password.length <= 7) {
          return {
            response: { valid: false },
            title: '🤕 Contraseña muy corta!',
            message: `La contraseña debe contener almenos 7 caracteres`,
            status: HttpStatus.NOT_ACCEPTABLE
          }
        }

        if (password != confirmPassword) {
          return {
            response: { valid: false },
            title: '🤕 Las contraseñas no coinciden!',
            message: `Por favor verifica que las contraseñas coincidan`,
            status: HttpStatus.NOT_ACCEPTABLE
          }
        }

        const passwordEncrypt: string = this._bcryp.encode(password);

        await this._authRepository.update(userExists.user_id, {
          new_user: false,
          password: passwordEncrypt,
          last_updated_date: new Date(),
          last_updated_by: userExists.user_id,
          code: null
        });

        const updatedUser = await this._authRepository.findOneBy({ user_id: userExists.user_id });

        return {
          response: [
            { valid: true },
            updatedUser.first_name,
            updatedUser.last_name,
            updatedUser.user_id,
          ],
          title: '🎉 Contraseña actualizada!',
          message: `Genial! Ya puedes acceder a la app.`,
          status: HttpStatus.OK
        }


      } else {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El código de validación no coincide, por favor contactate con el administrator del aplicativo`,
          status: HttpStatus.BAD_REQUEST
        }
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
