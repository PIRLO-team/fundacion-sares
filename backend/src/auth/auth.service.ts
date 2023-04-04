import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { TokenDto } from '../shared/interfaces/token.dto';
import { HandlersError } from '../shared/handlers/error.utils';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { BcryptPasswordEncoder } from './utils/bcrypt.utils';
import { ResetCodeSnippet } from './utils/random-code.utils';
import { PasswordGeneratorService } from './utils/random-password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _handlerError: HandlersError,
    private readonly _bcryp: BcryptPasswordEncoder,
    private readonly _resetCodeSnippet: ResetCodeSnippet,
    private readonly _newPasswordSnippet: PasswordGeneratorService,
    private readonly _jwtService: JwtService,
    private readonly _mailerService: MailerService,
  ) { }

  async registerUser(CreateUserDto: CreateUserDto, UserData: TokenDto) {
    try {
      const id: number = UserData.user_id;
      const userExist = await this._authRepository.findOneBy({ user_id: id });
      if (!userExist) {
        return {
          response: { valid: false },
          title: '❌ Ocurrio un error!',
          message: `Por favor inicia sesión nuevamente.`,
          status: HttpStatus.NOT_FOUND
        };
      }

      const role: string = userExist.user_role.toString();

      if (role !== '1') {
        return {
          response: { valid: false },
          title: '👮🏻‍♀️ Ocurrio un error!',
          message: 'No estas autorizado para realizar esta acción, por favor habla con el administrador',
          status: HttpStatus.UNAUTHORIZED
        }
      }

      const { first_name, last_name, email, profession, user_role } = CreateUserDto;

      const emailExist = await this._authRepository.findBy({ email: email, is_active: true });

      if (emailExist[0]) {
        return {
          response: { valid: false },
          title: '❌ Ocurrio un error!',
          message: 'El email que estas intentado guardar ya se encuentra registrado',
          status: HttpStatus.BAD_REQUEST
        }
      }

      const newPassword = this._newPasswordSnippet.generatePassword();
      const hashPassword: string = this._bcryp.encode(newPassword);

      const emailToUsername = email.split('@');

      const newUser = await this._authRepository.save({
        first_name,
        last_name,
        email,
        username: emailToUsername[0].toLocaleLowerCase(),
        profession,
        user_role,
        password: hashPassword,
        created_by: UserData.user_role,
        last_updated_by: UserData.user_role,
        created_date: new Date(),
        last_updated_date: new Date(),
      });

      const sendEmail = await this._mailerService.sendMail({
        to: email,
        subject: `Bienvenido a la Fundación S.A.R.E.S. ${first_name}`,
        text: 'Test',
        html: `<div>
                  <doctype html/>
                  <html lang="es">
                    <body style={{backgroundColor:"#f5f5f5", fontFamily:"Poppins, sans-serif;", fontSize:"16px", lineHeight:"1.6"}}>
                        <div style={{maxWidth:"600px", margin:"0 auto", padding:"20px"}}>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" style={{borderCollapse:"collapse", width:"100%", margin:"0"}}>
                              <tr>
                                <td align="left">
                                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FFunSARES%2F&psig=AOvVaw06mbjFuKhbQJetocS5trmI&ust=1679844128179000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjBu5Wx9_0CFQAAAAAdAAAAABAE" alt="Logo" style={{display:"block", maxWidth:"150px", height:"auto", margin:"0"}}/>
                                </td>
                                <td align="right" style={{verticalAlign:"middle"}}>
                                    <h1 style={{margin:"0"}}>Fundación S.A.R.E.S.</h1>
                                </td>
                              </tr>
                          </table>
                          <hr size="1" color="#e0e0e0" style={{margin:"20px 0"}}/>
                          <p style={{margin:"0"}}>Hola, <b>${newUser.first_name + ' ' + newUser.last_name}</b></p>
                          <p style={{margin:"0"}}>Te damos la bienvenida a la Fundación S.A.R.E.S. A continuación están las credenciales de acceso y los pasos ingresar al aplicativo.</p>
                          <p style={{margin:"0"}}><b><i>- Recuerde que la contraseña es de un solo uso, al momento en que ingrese por primera vez, se le pedira que cambie la contraseña -</b></i></p>
                          <ul style={{lineHeight:"1.6"}}>
                            <li>Correo:  <b>${newUser.email}</b></li>
                            <li>Usuario:  <b>${newUser.username}</b></li>
                            <li>Contraseña(Temporal): <b>${newPassword}</b></li>
                          </ul>
                          <p style={{margin:"0"}}>Puedes ingresar al aplicativo utilizando el correo o usuario la contraseña.</p>
                          <br/>
                          <p style={{margin:"0"}}>Atentamente,</p>
                          <p style={{margin:"0"}}>El equipo de la Fundación S.A.R.E.S.</p>
                        </div>
                    </body>
                  </html>
              </div>`,
      });

      return {
        response: {
          newUser,
          sendEmail
        },
        title: '✨ Usuario creado!',
        message: `Creaste la cuenta para ${first_name}, pronto le llegaran los pasos para ingresar a la app`,
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

      const userExists = await this._authRepository
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

      if (new_user === true) {
        const createCode = await this._resetCodeSnippet.randomCode();

        if (createCode) {
          await this._authRepository.update(user_id, { code: createCode })
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

      const valid: boolean = this._bcryp.matches(
        password,
        password_req
      );

      if (valid) {
        return {
          response: {
            valid: true,
            token: this._jwtService.sign(
              { user_id, email, username, first_name, last_name, user_role },
              { secret: env.JWT_SECRET }
            ),
            userData: { user_id, email, username, first_name, last_name, user_role }
          },
          title: `👋🏻 Hola ${first_name}!`,
          message: 'Bienvenido de vuelta a la Fundación S.A.R.E.S.',
          status: HttpStatus.OK
        }
      } else {
        return {
          response: { valid: false },
          title: '❌ Verifa tus datos!',
          message: 'Autenticación fallida, por favor verifica que los datos sean los correctos',
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
