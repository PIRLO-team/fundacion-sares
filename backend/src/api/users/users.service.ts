import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { UserRepository } from '../../auth/repository/user.repository';
import { User } from '../../auth/entities/user.entity';
import { HandlersError } from '../../shared/handlers/error.utils';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _handlerError: HandlersError,
  ) { }

  async findAllUsersAdmin(user: TokenDto,) {
    const user_role: number = +user.user_role;

    if (user_role !== 1) {
      return {
        response: { valid: false },
        title: '👮🏻‍♀️ No tienes acceso',
        message: 'No puedes realizar esta acción, por favor contactate con el administrador del aplicativo',
        status: HttpStatus.UNAUTHORIZED
      }
    }

    try {
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
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async findAllUsers() {
    try {
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
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async findUserById(user_id: number) {
    try {
      const userExists: User[] = await this._userRepository.find({
        select: [
          'user_id',
          'first_name',
          'last_name',
          'username',
          'email',
          'profession',
          'created_date',
          'phone'
        ],
        relations: ['userRole'],
        where: {
          user_id,
          is_active: true,
          user_role: Not(1)
        }
      });
      console.log("🚀 ~ file: users.service.ts:104 ~ UsersService ~ findUserById ~ userExists:", userExists)

      if (!userExists) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `El usuario que buscas no existe`,
          status: HttpStatus.NOT_FOUND
        }
      }
      const first_name = userExists[0].first_name;

      return {
        response: userExists,
        title: `✅ Usario ${first_name}`,
        message: `Información del usuario ${first_name}`,
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

    // TODO: Si es admin que tanto puede actualizar?
    // const token_user_role: number = user.user_role;
    // if (token_user_role === 1) {
    //   return {
    //     response: { valid: false },
    //     title: `❌ Ocurrio un error`,
    //     message: `No eres el propietario de esta cuenta, no puedes modificar el usuario`,
    //     status: HttpStatus.UNAUTHORIZED
    //   }
    // }

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
          // email: mail || email,
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
