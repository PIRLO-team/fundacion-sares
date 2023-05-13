import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDirectVolunteerDto } from './dto/create-direct-volunteer.dto';
import { UpdateDirectVolunteerDto } from './dto/update-direct-volunteer.dto';
import { DirectVolunteerRepository } from './direct-volunteer.repository';
import { DirectVolunteer } from './entities/direct-volunteer.entity';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';

@Injectable()
export class DirectVolunteerService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _directVolunteerRepository: DirectVolunteerRepository,
  ) { }

  async findAll() {
    try {
      const directVolunteers = await this._directVolunteerRepository.find();

      return {
        response: directVolunteers,
        title: '✅ Voluntarios Directos encontrados',
        message: `Se encontraron ${directVolunteers.length} voluntarios directos`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }


  async findOne(id: number) {
    try {
      const directVolunteer = await this._directVolunteerRepository.findOne({ where: { direct_volunteer_id: id } });
      if (!directVolunteer) {
        return {
          response: null,
          title: '❌ No se encontró el Voluntario Directo',
          message: `No se encontró ningún voluntario directo con el id ${id}`,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        response: directVolunteer,
        title: '✅ Voluntario Directo encontrado',
        message: `Se encontró el voluntario directo con el id ${id}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }


  async create(user: TokenDto, createDirectVolunteerDto: CreateDirectVolunteerDto) {
    const directVolunteer = new DirectVolunteer();

    directVolunteer.first_name = createDirectVolunteerDto.first_name;
    directVolunteer.last_name = createDirectVolunteerDto.last_name;
    directVolunteer.email = createDirectVolunteerDto.email;
    directVolunteer.profession = createDirectVolunteerDto.profession;
    directVolunteer.document = createDirectVolunteerDto.document;
    directVolunteer.phone = createDirectVolunteerDto.phone;
    directVolunteer.other_contact = createDirectVolunteerDto.other_contact;
    directVolunteer.created_by = user.user_id;
    directVolunteer.last_updated_by = user.user_id;

    try {
      const savedDirectVolunteer = await this._directVolunteerRepository.save(directVolunteer);
      return {
        response: savedDirectVolunteer,
        title: `✅ Se creo el Voluntario Directo`,
        message: `Se ha creado el nuevo voluntario directo ${savedDirectVolunteer.first_name}`,
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async update(user: TokenDto, id: number, updateDirectVolunteerDto: UpdateDirectVolunteerDto) {
    console.log("🚀 ~ file: direct-volunteer.service.ts:82 ~ DirectVolunteerService ~ update ~ updateDirectVolunteerDto:", updateDirectVolunteerDto)
    const directVolunteer = await this._directVolunteerRepository.findOne({ where: { direct_volunteer_id: id } });

    if (!directVolunteer) {
      return {
        title: `❌ Voluntario Directo no encontrado`,
        message: `No se encontró el voluntario directo con el ID ${id}`,
        status: HttpStatus.NOT_FOUND,
      };
    }

    directVolunteer.first_name = updateDirectVolunteerDto.first_name || directVolunteer.first_name;
    directVolunteer.last_name = updateDirectVolunteerDto.last_name || directVolunteer.last_name;
    directVolunteer.email = updateDirectVolunteerDto.email || directVolunteer.email;
    directVolunteer.profession = updateDirectVolunteerDto.profession || directVolunteer.profession;
    directVolunteer.document = updateDirectVolunteerDto.document || directVolunteer.document;
    directVolunteer.phone = updateDirectVolunteerDto.phone || directVolunteer.phone;
    directVolunteer.other_contact = updateDirectVolunteerDto.other_contact || directVolunteer.other_contact;
    directVolunteer.observation = updateDirectVolunteerDto.observation;
    directVolunteer.is_active = updateDirectVolunteerDto.is_active;
    directVolunteer.last_updated_by = user.user_id;

    try {
      const savedDirectVolunteer = await this._directVolunteerRepository.save(directVolunteer);
      return {
        response: savedDirectVolunteer,
        title: `✅ Voluntario Directo actualizado`,
        message: `Se ha actualizado el voluntario directo ${updateDirectVolunteerDto.first_name}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async deleteById(id: number) {
    try {
      const directVolunteer = await this._directVolunteerRepository.findOne({ where: { direct_volunteer_id: id } });

      if (!directVolunteer) {
        return {
          response: { valid: false },
          title: '❌ El Voluntario Directo no existe',
          message: `El Voluntario Directo con el ID ${id} no fue encontrado.`,
          status: HttpStatus.NOT_FOUND
        }
      }

      await this._directVolunteerRepository.remove(directVolunteer);

      return {
        response: { valid: true },
        title: '✅ El Voluntario Directo fue eliminado',
        message: `El Voluntario Directo con el ID ${id} fue eliminado correctamente.`,
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

}
