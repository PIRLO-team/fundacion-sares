import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ProviderRepository } from './provider.repository';
import { HandlersError } from '../../shared/handlers/error.utils';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _providerRepository: ProviderRepository,
  ) { }

  async findAll() {
    try {
      const providers = await this._providerRepository.find();
      return {
        response: providers,
        title: `✅ Lista de Proveedores`,
        message: `Se encontraron ${providers.length} proveedores`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async findById(id: number) {
    try {
      const provider = await this._providerRepository.findOne({ where: { provider_id: id } });
      if (!provider) {
        return {
          response: null,
          title: `❌ Proveedor no encontrado`,
          message: `El proveedor con id ${id} no existe`,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        response: provider,
        title: `✅ Proveedor encontrado`,
        message: `Se encontró el proveedor con id ${id}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async create(providerData: CreateProviderDto) {
    try {
      const {
        name,
        email,
        nit,
        phone,
        other_contact,
      } = providerData

      const savedProvider = await this._providerRepository.save({
        name,
        email,
        nit,
        phone,
        other_contact,
      });

      return {
        response: savedProvider,
        title: `✅ Proveedor creado`,
        message: `Se ha creado el proveedor ${savedProvider.name}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async update(id: number, providerData: UpdateProviderDto) {
    try {
      const provider = await this._providerRepository.findOne({ where: { provider_id: id } });
      if (!provider) {
        return {
          response: null,
          title: `❌ Proveedor no encontrado`,
          message: `El proveedor con id ${id} no existe`,
          status: HttpStatus.NOT_FOUND,
        };
      }

      provider.name = providerData.name || provider.name;
      provider.email = providerData.email || provider.email;
      provider.nit = providerData.nit || provider.nit;
      provider.phone = providerData.phone || provider.phone;
      provider.other_contact =
        providerData.other_contact || provider.other_contact;

      const updatedProvider = await this._providerRepository.save(provider);
      return {
        response: updatedProvider,
        title: `✅ Proveedor actualizado`,
        message: `Se ha actualizado el proveedor con id ${id}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async delete(id: number) {
    try {
      const provider = await this._providerRepository.findOne({ where: { provider_id: id } });

      if (!provider) {
        return {
          response: { valid: false },
          title: `❌ No se encontro el proveedor con id: ${id}`,
          message: `No se ha encontrado el proveedor, por favor intenta más tarde`,
          status: HttpStatus.NOT_FOUND
        };
      }

      await this._providerRepository.remove(provider).then(() => {
        return {
          response: { valid: true },
          title: `✅ El proveedor ${provider.name} ha sido eliminado correctamente`,
          message: `Se ha eliminado correctamente el proveedor con id ${id}`,
          status: HttpStatus.ACCEPTED,
        };
      }).catch((error) => {
        return {
          response: { valid: false },
          title: `❌ No se pudo eliminar el proveedor ${provider.name}`,
          message: `No se ha podido eliminar el proveedor, ya que tiene productos asociados`,
        }
      });
      
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

}
