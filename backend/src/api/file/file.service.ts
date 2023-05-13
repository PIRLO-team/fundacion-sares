import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { UserRepository } from '../../auth/repository/user.repository';
import { FileRepository } from './file.repository';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _fileRepository: FileRepository,
    private readonly _userRepository: UserRepository,
  ) {

  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findAll(user: TokenDto, updateFileDto: UpdateFileDto) {
    try {
      const userExist = await this._userRepository.findOne({
        where: { user_id: user.user_id }
      });
      if (!userExist) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `El usuario no existe`,
          status: HttpStatus.NOT_FOUND
        }
      }
      const { user_id: id, user_role } = userExist;

      const file = await this._fileRepository.find({
        relations: ['userFile'],
        select: [
          'user_id'
        ],
      });


      return {
        response: { valid: true },
        title: `✅ Se encontrón los datos`,
        message: `Se encontrón los datos del usuario`,
        status: HttpStatus.OK,
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  async updateFile(user: TokenDto, user_id: number, updateFileDto: UpdateFileDto) {
    try {
      const { url } = updateFileDto;
      const userExist = await this._userRepository.findOne({
        where: { user_id }
      });
      if (!userExist) {
        return {
          response: { valid: false },
          title: `❌ Ocurrio un error`,
          message: `El usuario no existe`,
          status: HttpStatus.NOT_FOUND
        }
      }
      const { user_id: id, first_name } = userExist;
      const file = await this._fileRepository.findOneBy({ user_id: id });

      if (file) {
        const { file_id, url: urlExist } = file;

        if (url !== urlExist) {
          await this._fileRepository.update(file_id, { is_active: false });
        } else {
          return {
            response: { valid: true },
            title: `✅ La tarjeta profesional ya esta almacenada`,
            message: `No se ha modificado ningun dato`,
            status: HttpStatus.OK
          }
        }
      }

      const saveUrl = await this._fileRepository.save({
        user_id,
        url,
        created_by: id,
        last_updated_by: id,
      })
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

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
