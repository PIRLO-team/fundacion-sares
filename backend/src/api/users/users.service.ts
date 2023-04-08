import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  findAllUsers() {
    return {
      response: { valid: true },
      title: '✅ Todos los usuarios',
      message: 'Listado de todos los usuarios registrados en el aplicativo',
      status: HttpStatus.OK
    }
  }

  findUserById(id: number) {
    return {
      response: { valid: true },
      title: `✅ Usario ${id}`,
      message: `Información del usuario ${id}`,
      status: HttpStatus.OK
    }
  }

  updateUserData(id: number, updateUserDto: UpdateUserDto) {
    return {
      response: { valid: true },
      title: `✅ Se actualizó la información`,
      message: `Hemos actualizado la información del usuario ${id}`,
      status: HttpStatus.OK
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
