import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { UserRepository } from '../../auth/repository/user.repository';
import { User } from '../../auth/entities/user.entity';
import { HandlersError } from '../../shared/handlers/error.utils';
import { Not } from 'typeorm';
import { BcryptPasswordEncoder } from '../../auth/utils/bcrypt.utils';
import { PasswordGeneratorService } from '../../auth/utils/random-password.utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _handlerError: HandlersError,
    private readonly _bcryp: BcryptPasswordEncoder,
    private readonly _newPasswordSnippet: PasswordGeneratorService,
  ) { }

  async findAllUsers(user: TokenDto) {
    try {
      const role: number = user.user_role
      if (+role === 1) {
        const allUsers: User[] = await this._userRepository.find({
          select: [
            'user_id',
            'first_name',
            'last_name',
            'username',
            'email',
            'profession',
            'is_active',
            'created_date',
          ],
          relations: ['userRole']
        });

        return {
          response: allUsers,
          title: '✅ Todos los usuarios',
          message: 'Listado de todos los usuarios registrados en el aplicativo para admin',
          status: HttpStatus.OK
        }
      } else {
        const allUsers: User[] = await this._userRepository.find({
          select: [
            'user_id',
            'first_name',
            'last_name',
            'username',
            'email',
            'profession',
            'created_date',
          ],
          relations: ['userRole'],
          where: {
            is_active: true,
            user_role: Not(1)
          }
        });

        return {
          response: allUsers,
          title: '✅ Todos los usuarios',
          message: 'Listado de todos los usuarios registrados en el aplicativo',
          status: HttpStatus.OK
        }
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async findUserById(user_id: number) {
    try {
      const userById: User[] = await this._userRepository.find({
        select: [
          'user_id',
          'first_name',
          'last_name',
          'username',
          'email',
          'profession',
          'created_date',
        ],
        relations: ['userRole'],
        where: {
          is_active: true,
          user_id
        }
      });

      if(!userById?.length){
        return {
          response: {valid: false},
          title: '❌ Ocurrio un error',
          message: 'El usuario que buscas no se encuentra ergistrado',
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        response: userById,
        title: '✅ Todos los usuarios',
        message: 'Listado de todos los usuarios registrados en el aplicativo',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async updateUserData(user: TokenDto, user_id: number, updateUserDto: UpdateUserDto) {
    const userExist: User = await this._userRepository.findOneBy({ user_id });

    if (!userExist) {
      return {
        response: { valid: false },
        title: `❌ Ocurrio un error`,
        message: `El usuario que buscas no existe`,
        status: HttpStatus.NOT_FOUND
      }
    }

    try {
      const id: number = user.user_id;
      const r: number = user.user_role;
      const query_user_id: number = userExist.user_id;
      if (+id === query_user_id || +r === 1) {

        const { first_name, last_name, email, document, profession, img_profile, user_role } = userExist;
        const { first_name: fName, last_name: lName, email: mail, document: doc, profession: pro, img_profile: url, user_role: role } = updateUserDto;

        const updateUserData = await this._userRepository.update(user_id, {
          first_name: fName || first_name,
          last_name: lName || last_name,
          document: doc || document,
          profession: pro || profession,
          img_profile: url || img_profile,
          user_role: role || user_role,
          last_updated_by: id,
        });

        return {
          response: updateUserData,
          title: `✅ Se actualizó la información`,
          message: `Hemos actualizado la información del usuario ${user_id}`,
          status: HttpStatus.OK
        }
      } else {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `No eres el propietario de esta cuenta, no puedes modificar el usuario`,
          status: HttpStatus.UNAUTHORIZED
        }
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async resetPassword(user: TokenDto, user_id: number, updateUserDto: UpdateUserDto) {
    try {
      const { user_id: id } = user;
      const userExists = await this._userRepository.findOneBy({ user_id: user_id });

      if (!userExists) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `El usuario que buscas no existe`,
          status: HttpStatus.NOT_FOUND
        }
      }

      if (id !== userExists.user_id) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `No eres el propietario de esta cuenta, no puedes modificar el usuario`,
          status: HttpStatus.UNAUTHORIZED
        }
      }

      const { password, new_password, comfirm_password } = updateUserDto;

      if (!new_password || !comfirm_password) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `Por favor ingresa las contraseña nueva o la confirmación`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      if (new_password.length < 7) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `La contrarseña debe contener al menos 7 caracteres`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const valid: boolean = this._bcryp.matches(
        userExists.password,
        password
      );

      if (!valid) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `Credenciales invalidas, por favor verifica tu contraseña`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const hashedPassword = this._bcryp.encode(new_password);
      await this._userRepository.update(id, {
        password: hashedPassword,
        last_updated_by: id,
      });

      return {
        response: { valid: true },
        title: `✅ Se actualizó la información`,
        message: `Haz actualizado tu contraseña ${userExists.first_name}`,
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async inactiveUser(user: TokenDto, user_id: number, updateUserDto: UpdateUserDto) {
    const userExist: User = await this._userRepository.findOneBy({ user_id });

    if (!userExist) {
      return {
        response: { valid: false },
        title: `❌ Ocurrio un error`,
        message: `El usuario que buscas no existe`,
        status: HttpStatus.NOT_FOUND
      }
    }

    try {
      const r: number = user.user_role;
      const id: number = user.user_id;
      const { is_active: status } = updateUserDto;

      if (+r === 1) {
        const inactiveUser = await this._userRepository.update(user_id, {
          is_active: status,
          last_updated_by: id,
        });


        return {
          response: inactiveUser,
          title: `🚫 Se inactivo el usuario`,
          message: `El usuario ${userExist.first_name + ' ' + userExist.last_name} fue desactivado, no tiene acceso al aplicativo`,
          status: HttpStatus.ACCEPTED
        }
      } else {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `No puedes modificar el usuario`,
          status: HttpStatus.UNAUTHORIZED
        }
      }


    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  logicalRemove(id: number) {
    return {
      response: { valid: true },
      title: `🗑️ Se eliminó el usuario`,
      message: `El usuario ${id} fue eliminado correctamente`,
      status: HttpStatus.ACCEPTED
    }
  }
}
