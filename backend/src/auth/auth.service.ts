import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { TokenDto } from '../shared/interfaces/token.dto';
import { HandlersError } from '../shared/handlers/error.utils';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { BcryptPasswordEncoder } from '../shared/utils/bcrypt.utils';
import { ResetCodeSnippet } from '../shared/utils/random-code.utils';
import { PasswordGeneratorService } from '../shared/utils/random-password.utils';
import { RoleRepository } from './repository/role.repository';
import { emailCode, emailWelcome } from '../shared/utils/email.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _roleRepository: RoleRepository,
    private readonly _handlerError: HandlersError,
    private readonly _bcryp: BcryptPasswordEncoder,
    private readonly _resetCodeSnippet: ResetCodeSnippet,
    private readonly _newPasswordSnippet: PasswordGeneratorService,
    private readonly _jwtService: JwtService,
    private readonly _mailerService: MailerService,
  ) {}

  async registerUser(newUserDto: CreateUserDto, tokenDto: TokenDto) {
    try {
      const { user_id } = tokenDto;
      const userExist = await this._userRepository.findOneBy({ user_id });
      if (!userExist) {
        return {
          response: { valid: false },
          title: '❌ Ocurrio un error!',
          message: 'Por favor inicia sesión nuevamente',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const role = userExist.user_role.toString();
      if (role !== '1') {
        return {
          response: { valid: false },
          title: '👮🏻‍♀️ No autorizado!',
          message:
            'No estas autorizado para realizar esta acción, por favor comunicate con el administrador',
          status: HttpStatus.UNAUTHORIZED,
        };
      }

      const email = newUserDto.email.trim().toLocaleLowerCase();
      const emailExists = await this._userRepository.findOneBy({ email });
      if (emailExists) {
        if (!emailExists?.is_active) {
          return {
            response: { valid: false },
            title: '⚠️: Cuenta inactiva!',
            message:
              'La cuenta que tratas de guardar ya esta registrada y se encuentra inactiva',
            status: HttpStatus.BAD_REQUEST,
          };
        }

        if (emailExists?.is_active) {
          return {
            response: { valid: false },
            title: '⚠️: Correo en uso!',
            message:
              'El correo que tratas de guardar ya se encuentra registrado',
            status: HttpStatus.BAD_REQUEST,
          };
        }
      }

      const password = this._newPasswordSnippet.generatePassword();
      const hashedPassword = this._bcryp.encode(password);
      const emailToUsername = email.split('@');
      const newUsername = emailToUsername[0].toLocaleLowerCase();
      const { first_name, last_name, profession, user_role } = newUserDto;
      const newUser = await this._userRepository.save({
        first_name,
        last_name,
        email,
        username: newUsername,
        profession,
        user_role,
        img_profile: `https://source.boringavatars.com/marble/120/${newUsername}`,
        password: hashedPassword,
        created_by: tokenDto.user_role,
        last_updated_by: tokenDto.user_role,
        created_date: new Date(),
        last_updated_date: new Date(),
      });

      const emailSent = await this._mailerService.sendMail({
        to: email,
        subject: `👋 Bienvenido a la Fundación S.A.R.E.S.`,
        text: 'Test',
        html: emailWelcome(first_name, email, newUsername, password),
      });

      return {
        response: {
          newUser,
          emailSent,
        },
        title: '✨ Usuario creado!',
        message: `Haz creado la cuenta para ${first_name}, le hemos enviado un correo con los pasos para acceder a la plataforma`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async logIn(LogInCredentialDto: LogInCredentialDto): Promise<any> {
    try {
      const user_req: string = LogInCredentialDto.user
        .trim()
        .toLocaleLowerCase();
      const password_req: string = LogInCredentialDto.password;

      if (!(user_req || password_req)) {
        return {
          response: { valid: false },
          title: '❌ Campos vacios!',
          message: 'Por favor ingrese todos los datos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const userExists = await this._userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect(
          'user.userFile',
          'userFile',
          'userFile.is_active = :isActive',
          { isActive: true },
        )
        .where('user.email = :user_req OR user.username = :user_req', {
          user_req,
        })
        .getOne();

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El usuario ingresado ${user_req} no fue encontrado, por favor verifica los datos`,
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const {
        is_active,
        user_id,
        first_name,
        last_name,
        password,
        email,
        username,
        new_user,
        user_role,
        phone,
        img_profile,
        profession,
        other_contact,
        userFile: [userFile],
      } = userExists;

      if (!is_active) {
        return {
          response: { valid: false },
          title: '⚠︰ Usuario inactivo!',
          message: `Tu cuenta no está activa, por favor contacta al administrador`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const userRole = await this._roleRepository.findOneBy({
        role_id: user_role,
      });

      const valid: boolean = this._bcryp.matches(password, password_req);

      if (!valid) {
        return {
          response: { valid: false },
          title: '❌ Verifa tus datos!',
          message:
            'Autenticación fallida, por favor verifica que los datos sean los correctos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      if (new_user === true) {
        const createCode = await this._resetCodeSnippet.randomCode();

        if (createCode) {
          await this._userRepository.update(user_id, { code: createCode });
        } else {
          return {
            response: {
              valid: false,
            },
            title: '❌ Ocurrio un error!',
            message: 'Por favor intentalo más tarde',
            status: HttpStatus.BAD_REQUEST,
          };
        }

        return {
          response: {
            new_user,
            user_id,
            code: createCode,
          },
          title: '👋🏻 Bienvenido a la Fundación S.A.R.E.S!',
          message: 'Por favor cambia tu contraseña',
          status: HttpStatus.TEMPORARY_REDIRECT,
        };
      }

      return {
        response: {
          valid: true,
          token: this._jwtService.sign(
            { user_id, user_role },
            { secret: env.JWT_SECRET },
          ),
          userData: {
            user_id,
            email,
            username,
            first_name,
            last_name,
            phone,
            img_profile,
            profession,
            other_contact,
            userFile,
          },
          userRole: userRole,
        },
        title: `👋🏻 Hola ${first_name}!`,
        message: 'Bienvenido de vuelta a la Fundación S.A.R.E.S.',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async passwordResetStepOne(UpdateAuthDto: UpdateAuthDto) {
    try {
      let emailSent: any;
      const userExists = await this._userRepository.findOneBy({
        email: UpdateAuthDto.email,
        is_active: true,
      });

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌: Correo no valido!',
          message: `Por favor ingrese un correo valido`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const { user_id, first_name, last_name, email } = userExists;
      email.trim().toLocaleLowerCase();
      const createCode = await this._resetCodeSnippet.randomCode();
      if (createCode) {
        await this._userRepository.update(user_id, { code: createCode });
        emailSent = await this._mailerService.sendMail({
          to: email,
          subject: `🔐 Cambio de contraseña - Fundación S.A.R.E.S.`,
          text: 'Test',
          html: emailCode(first_name, last_name, createCode),
        });
      } else {
        return {
          response: {
            valid: false,
          },
          title: '❌: Ocurrio un error!',
          message: 'Por favor intentalo más tarde',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: {
          user_id,
          emailSent,
        },
        title: '📨: Código enviado!',
        message: `Revisa tu buzón... el código fue enviado pero no se lo compartas a nadie 🤫`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async passwordResetStepTwo(user: number, UpdateAuthDto: UpdateAuthDto) {
    try {
      const { code } = UpdateAuthDto;
      if (!code) {
        return {
          response: {
            valid: false,
          },
          title: '❌: Ocurrio un error!',
          message: 'Por favor ingresa el código',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const userExists = await this._userRepository.findOneBy({
        user_id: user,
        code,
        is_active: true,
      });
      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌: Código no valido!',
          message: `Por favor ingrese el código nuevamente o genere uno nuevo`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: {
          user,
          code,
        },
        title: '🔓: Código valido!',
        message: `Puedes cambiar la contraseña`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async regenerateCode(user, UpdateAuthDto: UpdateAuthDto) {
    try {
      let emailSent: any;
      const userExists = await this._userRepository.findOneBy({
        user_id: user,
        is_active: true,
      });
      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌ Código no valido!',
          message: `Por favor ingrese el código nuevamente o genere uno nuevo`,
          status: HttpStatus.BAD_REQUEST,
        };
      }
      const { user_id, first_name, last_name, email } = userExists;
      email.trim().toLocaleLowerCase();
      const createCode = await this._resetCodeSnippet.randomCode();
      if (createCode) {
        await this._userRepository.update(user_id, { code: createCode });
        emailSent = await this._mailerService.sendMail({
          to: email,
          subject: `🔐 Cambio de contraseña - Fundación S.A.R.E.S.`,
          text: 'Test',
          html: emailCode(first_name, last_name, createCode),
        });
      } else {
        return {
          response: {
            valid: false,
          },
          title: '❌ Ocurrio un error!',
          message: 'Por favor intentalo más tarde',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: {
          user_id,
          emailSent,
        },
        title: '📨: Código enviado!',
        message: `Revisa tu buzón... el código fue enviado pero no se lo compartas a nadie 🤫`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async resetPassword(
    user: number,
    code: string,
    UpdateAuthDto: UpdateAuthDto,
  ) {
    try {
      const password: string = UpdateAuthDto.password;
      const confirmPassword: string = UpdateAuthDto.confirmPassword;
      const userExists: User = await this._userRepository.findOneBy({
        user_id: user,
      });

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El usuario no coincide, por favor contactate con el administrator del aplicativo`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const userCode: number = userExists.code;
      const incomingCode: number = parseInt(code);
      if (userCode === incomingCode) {
        if (password.length <= 7) {
          return {
            response: { valid: false },
            title: '🤕: Contraseña muy corta!',
            message: `La contraseña debe contener almenos 7 caracteres`,
            status: HttpStatus.NOT_ACCEPTABLE,
          };
        }

        if (password != confirmPassword) {
          return {
            response: { valid: false },
            title: '🤕: Las contraseñas no coinciden!',
            message: `Por favor verifica que las contraseñas coincidan`,
            status: HttpStatus.NOT_ACCEPTABLE,
          };
        }

        const passwordEncrypt: string = this._bcryp.encode(password);

        await this._userRepository.update(userExists.user_id, {
          new_user: false,
          password: passwordEncrypt,
          last_updated_date: new Date(),
          last_updated_by: userExists.user_id,
          code: null,
        });

        const updatedUser = await this._userRepository.findOneBy({
          user_id: userExists.user_id,
        });

        return {
          response: [
            { valid: true },
            updatedUser.first_name,
            updatedUser.last_name,
            updatedUser.user_id,
          ],
          title: '🎉: Contraseña actualizada!',
          message: `Genial! Ya puedes acceder a la app.`,
          status: HttpStatus.OK,
        };
      } else {
        return {
          response: { valid: false },
          title: '❌: Datos no validos!',
          message: `El código de validación no coincide, por favor contactate con el administrator del aplicativo`,
          status: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async userResetRequest(user: number) {
    try {
      const userExists: User = await this._userRepository.findOneBy({
        user_id: user,
      });

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌: Datos no validos!',
          message: `El usuario no coincide, por favor contactate con el administrator del aplicativo`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const { first_name, last_name, email, username } = userExists;

      return {
        response: {
          first_name,
          last_name,
          email,
          username,
        },
        title: '✅: Todos los usuarios',
        message: 'Listado de todos los usuarios registrados en el aplicativo',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async checkAuth(user: TokenDto) {
    try {
      const userExists: User[] = await this._userRepository.find({
        select: [
          'user_id',
          'first_name',
          'last_name',
          'email',
          'username',
          'img_profile',
          'profession',
          'phone',
          'is_active',
        ],
        where: {
          user_id: user.user_id,
          is_active: true,
        },
        relations: ['userRole', 'userFile'],
      });

      if (!userExists.length) {
        return {
          response: { valid: false },
          title: '❌: Ocurrio un error!',
          message: 'Por favor inicia sesión nuevamente',
          status: HttpStatus.NOT_FOUND,
        };
      }

      return {
        response: userExists[0],
        message: 'Usario autenticado correctamente',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
