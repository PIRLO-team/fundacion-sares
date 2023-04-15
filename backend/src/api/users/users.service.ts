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
    
    const token_user_id: number = user.user_id;
    const query_user_id: number = userExist.user_id;
    if (token_user_id !== query_user_id) {
      return {
        response: { valid: false },
        title: `❌ Ocurrio un error`,
        message: `No eres el propietario de esta cuenta, no puedes modificar el usuario`,
        status: HttpStatus.UNAUTHORIZED
      }
    }

    try {
      const {first_name, last_name, email, document, profession, professional_card, } = updateUserDto;
      return {
        response: { valid: true },
        title: `✅ Se actualizó la información`,
        message: `Hemos actualizado la información del usuario ${user_id}`,
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  inactiveUser(id: number) {
    return {
      response: { valid: true },
      title: `🚫 Se inactivo el usuario`,
      message: `El usuario ${id} fue desactivado, no tiene acceso al aplicativo`,
      status: HttpStatus.ACCEPTED
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
