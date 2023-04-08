import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDirectVolunteerDto } from './dto/create-direct-volunteer.dto';
import { UpdateDirectVolunteerDto } from './dto/update-direct-volunteer.dto';

@Injectable()
export class DirectVolunteerService {

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

  updateUserData(id: number, updateDirectVolunteerDto: UpdateDirectVolunteerDto) {
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
