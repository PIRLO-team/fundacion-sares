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
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random-code.utils';
import { PasswordGeneratorService } from './utils/random-password.utils';
import { RoleRepository } from './repository/role.repository';

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
  ) { }

  async registerUser(newUserDto: CreateUserDto, tokenDto: TokenDto) {
    try {
      const { user_id } = tokenDto;
      const existingUser = await this._userRepository.findOneBy({ user_id });
      if (!existingUser) {
        return {
          response: { valid: false },
          title: '❌ Error!',
          message: 'Please log in again.',
          status: HttpStatus.NOT_FOUND
        };
      }

      const role = existingUser.user_role.toString();
      if (role !== '1') {
        return {
          response: { valid: false },
          title: '👮🏻‍♀️ Error!',
          message: 'You are not authorized to perform this action, please contact the administrator',
          status: HttpStatus.UNAUTHORIZED
        }
      }

      const email = newUserDto.email.trim().toLocaleLowerCase();
      const emailExists = await this._userRepository.findBy({ email, is_active: true });
      if (emailExists[0]) {
        return {
          response: { valid: false },
          title: '❌ Error!',
          message: 'The email you are trying to save is already registered',
          status: HttpStatus.BAD_REQUEST
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
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fundacion sares - Email</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
        
            body {
              font-family: 'Inter', sans-serif;
              font-size: 16px;
              line-height: 1.42857143;
              background-color: #fff;
              padding: 2rem 1.5rem;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              height: 100%;
              width: 100%;
            }

            img {
              width: 60%;
            }
        
            .email {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              background-color: #fff;
              border-radius: 10px;
              max-width: 700px;
              width: 100%;
              box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
            }
        
            .email__asset {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-bottom: 2rem;
              border-bottom: 2px solid #eaeaea;
            }
        
            .email__asset img {
              width: 100%;
              max-width: 100px;
            }
        
            .email__content {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
        
            .email__h1 {
              font-size: 1.4rem;
              font-weight: 400;
              margin: 1.5rem 0;
            }
        
            .email__h2 {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 1rem 0;
            }
        
            .email__footer__text {
              margin-top: 1.5rem;
              font-weight: 500;
            }
        
            @media screen and (max-width: 500px) {
              .email__h1 {
                font-size: 1rem;
              }
        
              p {
                font-size: 0.875rem;
              }
            }
          </style>
        </head>
        
        <body>
          <main class="email">
            <div class="email__asset">
              <img src="https://pirlo.s3.us-west-1.amazonaws.com/Access/SARESmod1.0.webp" alt="Logo fundación S.A.R.E.S." />
            </div>
        
            <div class="email__content">
              <h1 class="email__h1">Hola, <strong>${first_name}</strong></h1>
              <p>
                Te damos la bienvenida a la Fundación S.A.R.E.S. A continuación están las credenciales de acceso y los pasos para ingresar al aplicativo.
              </p>
        
              <br />
        
              <p class="email__note">
                <strong>
                  Nota: Recuerde que la contraseña es de un solo uso, al momento en que ingrese por primera vez, se le pedirá que la cambie.
                </strong>
              </p>
        
              <h2 class="email__h2">Credenciales de acceso</h2>
        
              <p><strong>Correo:</strong> <span>${email}</span></p>
              <p><strong>Usuario:</strong> <span>${newUsername}</span></p>
              <p><strong>Contraseña:</strong> <span>${password}</span></p>
        
              <h2 class="email__h2">Pasos para ingresar</h2>
        
              <p>
                1. Ingresa a la siguiente dirección:
                <a href="http://localhost:3000/login">Link fundacion S.A.R.E.S</a>.
              </p>
              <p>
                2. Ingresa tu usuario y contraseña temporal que se encuentran en este
                correo.
              </p>
              <p>3. Ingresa la contraseña que deseas utilizar en el aplicativo.</p>
              <p>4. Listo, ya puedes iniciar sesión con tu nueva contraseña.</p>
        
              <p class="email__footer__text">
                Saludos, <br />
                El equipo de la Fundación S.A.R.E.S.
              </p>
            </div>
          </main>
        </body>
        
        </html>`,
      });

      return {
        response: {
          newUser,
          emailSent
        },
        title: '✨ Usuario cread0!',
        message: `Haz creado la cuenta para ${first_name}, le hemos enviado un correo con los pasos para acceder a la plataforma`,
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }


  async logIn(LogInCredentialDto: LogInCredentialDto): Promise<any> {
    try {
      const user_req: string = LogInCredentialDto.user.trim().toLocaleLowerCase();
      const password_req: string = LogInCredentialDto.password;

      if (!(user_req || password_req)) {
        return {
          response: { valid: false },
          title: '❌ Campos vacios!',
          message: 'Por favor ingrese todos los datos',
          status: HttpStatus.BAD_REQUEST
        }
      }

      const userExists = await this._userRepository
        .createQueryBuilder('user')
        .where('user.email = :user_req OR user.username = :user_req', { user_req })
        .getOne();

      if (!userExists) {
        return {
          response: { valid: false },
          title: '❌ Datos no validos!',
          message: `El usuario ingresado <b>${user_req}</b> no fue encontrado, por favor verifica los datos`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const { user_id, first_name, last_name, password, email, username, new_user, user_role } = userExists;

      const userRole = await this._roleRepository.findOneBy({ role_id: user_role });

      const valid: boolean = this._bcryp.matches(
        password,
        password_req
      );

      if (!valid) {
        return {
          response: { valid: false },
          title: '❌ Verifa tus datos!',
          message: 'Autenticación fallida, por favor verifica que los datos sean los correctos',
          status: HttpStatus.BAD_REQUEST
        }
      }

      if (new_user === true) {
        const createCode = await this._resetCodeSnippet.randomCode();

        if (createCode) {
          await this._userRepository.update(user_id, { code: createCode })
        } else {
          return {
            response: {
              valid: false,
            },
            title: '❌ Ocurrio un error!',
            message: 'Por favor intentalo más tarde',
            status: HttpStatus.BAD_REQUEST
          }
        }

        return {
          response: {
            new_user,
            user_id,
            code: createCode,
          },
          title: '👋🏻 Bienvenido a la Fundación S.A.R.E.S!',
          message: 'Por favor cambia tu contraseña',
          status: HttpStatus.TEMPORARY_REDIRECT
        }
      }

      return {
        response: {
          valid: true,
          token: this._jwtService.sign(
            { user_id, email, username, first_name, last_name, user_role },
            { secret: env.JWT_SECRET }
          ),
          userData: { user_id, email, username, first_name, last_name },
          userRole: userRole
        },
        title: `👋🏻 Hola ${first_name}!`,
        message: 'Bienvenido de vuelta a la Fundación S.A.R.E.S.',
        status: HttpStatus.OK
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async resetPassword(user: number, code: string, UpdateAuthDto: UpdateAuthDto) {
    try {
      const password: string = UpdateAuthDto.password;
      const confirmPassword: string = UpdateAuthDto.confirmPassword;
      const userExists: User = await this._userRepository.findOneBy({ user_id: user });

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

        await this._userRepository.update(userExists.user_id, {
          new_user: false,
          password: passwordEncrypt,
          last_updated_date: new Date(),
          last_updated_by: userExists.user_id,
          code: null
        });

        const updatedUser = await this._userRepository.findOneBy({ user_id: userExists.user_id });

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
