import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { DiscountTypeRepository } from './repositories/discount-type.repository';
import { NonConsumableRepository } from './repositories/non-consumable.repository';
import { NonConsumableStatusRepository } from './repositories/non-consumable-status.repository';
import {
  CreateNonConsumableCategorySupplyDto,
  CreateNonConsumableSupplyDto,
} from './dto/create-supply.dto';
import { Like } from 'typeorm';
import { NonConsumable } from './entities/non-consumable.entity';
import { UpdateNonConsumableSupplyDto } from './dto/update-supply.dto';
import { NonConsumableCategoryRepository } from './repositories/non-consumable-category.repository';
import { NonConsumableCategory } from './entities/non-consumable-category.entity';
import { NonConsumableStatus } from './entities/non-consumable-status.entity';
import { DiscountNonConsumableRepository } from './repositories/discount-non-consumable.repository';

@Injectable()
export class NonConsumableService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _nonConsumableCategoryRepository: NonConsumableCategoryRepository,
    private readonly _nonConsumableRepository: NonConsumableRepository,
    private readonly _nonConsumableStatusRepository: NonConsumableStatusRepository,
    private readonly _discountNonConsumableRepository: DiscountNonConsumableRepository,
  ) {}

  async getNonCosumableCategories() {
    try {
      const nonConsumableCategories: NonConsumableCategory[] =
        await this._nonConsumableCategoryRepository.find({
          where: {
            is_active: true,
          },
        });

      if (!nonConsumableCategories.length) {
        return {
          response: { valid: true },
          title: '⚠: No hay categorias de insumos No Consumibles',
          message: 'No hay categorias de insumos No Consumibles',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: nonConsumableCategories,
        title: '✅: Categorias de insumos No Consumibles',
        message: 'Categorias de insumos No Consumibles',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getNonConsumableStatus() {
    try {
      const nonConsumableStatus: NonConsumableStatus[] =
        await this._nonConsumableStatusRepository.find();

      return {
        response: nonConsumableStatus,
        title: '✅: Tipos de insumos No Consumibles',
        message: 'Tipos de insumos No Consumibles',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getNonConsumableSupplies() {
    try {
      const nonConsumableSupplies: NonConsumable[] =
        await this._nonConsumableRepository.find({
          relations: [
            'nonConsumableCategory',
            'providerNonConsumable',
            'acquisitionTypeNonConsumable',
          ],
          where: {
            is_active: true,
          },
        });

      if (!nonConsumableSupplies.length) {
        return {
          response: [],
          title: '⚠: No hay insumos No Consumibles',
          message: 'No hay insumos No Consumibles',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: nonConsumableSupplies,
        title: '✅: Insumos No Consumibles',
        message: 'Listado de todos los insumos No Consumibles',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getNonConsumableSupplyById(nonConsumableId: string) {
    try {
      const nonConsumableSupplyById: NonConsumable =
        await this._nonConsumableRepository.findOne({
          relations: [
            'nonConsumableCategory',
            'providerNonConsumable',
            'acquisitionTypeNonConsumable',
          ],
          where: {
            is_active: true,
          },
        });

      if (!nonConsumableSupplyById) {
        return {
          response: { valid: true },
          title: '⚠: No se encontrón el insumo No Consumible',
          message: `El insumo ${nonConsumableId} No Consumible no se encontrón`,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      return {
        response: nonConsumableSupplyById,
        title: '✅: Insumo No Consumible',
        message: `Insumo No Consumible ${nonConsumableId}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createNonConsumableHeaderSupply(
    user: TokenDto,
    createNonConsumableCategorySupplyDto: CreateNonConsumableCategorySupplyDto,
  ) {
    try {
      const { non_consumable_category_supply_name, non_consumable_status_id } =
        createNonConsumableCategorySupplyDto;

      if (!non_consumable_category_supply_name || !non_consumable_status_id) {
        return {
          response: { valid: false },
          title: '⚠: Error al crear la categoria deinsumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      if (non_consumable_category_supply_name.length > 45) {
        return {
          response: { valid: false },
          title: '⚠: Error al crear la categoria deinsumo No Consumible',
          message:
            'El nombre de la categoria de insumo No Consumible debe tener máximo 45 caracteres',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const nonConsumableCategoryExist: NonConsumableCategory =
        await this._nonConsumableCategoryRepository.findOne({
          where: {
            non_consumable_category_supply_name,
            is_active: true,
          },
        });

      const newNonConsumableCategory: NonConsumableCategory =
        await this._nonConsumableCategoryRepository.save({
          non_consumable_category_supply_name,
          non_consumable_status_id,
          created_by: user.user_id,
          last_updated_by: user.user_id,
        });

      return {
        response: newNonConsumableCategory,
        title:
          '✅: La categoria de insumo No Consumible se ha creado correctamente',
        message: `La categoria ingresada ${non_consumable_category_supply_name} se ha creado correctamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createNonConsumableSupply(
    user: TokenDto,
    createNonConsumableSupplyDto: CreateNonConsumableSupplyDto,
  ) {
    try {
      const {
        non_consumable_category_supply_id,
        provider_id,
        acquisition_id,
        agreement,
      } = createNonConsumableSupplyDto;

      if (
        !non_consumable_category_supply_id ||
        !provider_id ||
        !acquisition_id
      ) {
        return {
          response: { valid: false },
          title: '⚠: Error al crear el insumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      if (agreement.length > 1000) {
        return {
          response: { valid: false },
          title: '⚠️: Excediste los caracteres permitidos',
          message:
            'El acuerdo por intercambio debe contener máximo 1000 caracteres',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const categoryExist = await this._nonConsumableCategoryRepository.findOne(
        {
          where: {
            non_consumable_category_supply_id,
            is_active: true,
          },
        },
      );

      const supplyId = `${categoryExist.non_consumable_category_supply_name
        .substring(0, 3)
        .toUpperCase()}`;
      const lastId = await this._nonConsumableRepository.count({
        where: {
          non_consumable_id: Like(`%${supplyId}%`),
        },
      });

      const countId = lastId + 1;
      const newNonConsumableId = `${supplyId}-${countId}`;

      const newNonConsumable: NonConsumable =
        await this._nonConsumableRepository.save({
          non_consumable_id: newNonConsumableId,
          non_consumable_category_supply_id,
          provider_id,
          acquisition_id,
          agreement,
          created_by: user.user_id,
          last_updated_by: user.user_id,
        });

      return {
        response: newNonConsumable,
        title: '✅: El insumo No Consumible se ha ingresado correctamente',
        message: `El insumo ingresado ${categoryExist.non_consumable_category_supply_name} se ha guardado correctamente`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async updateNonConsumableSupply(
    user: TokenDto,
    updateNonConsumableSupplyDto: UpdateNonConsumableSupplyDto,
    nonConsumableId: string,
  ) {
    try {
      const { provider_id, acquisition_id, agreement } =
        updateNonConsumableSupplyDto;

      if (!nonConsumableId || !provider_id || !acquisition_id) {
        return {
          response: { valid: false },
          title: '⚠: Error al actualizar el insumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      if (agreement.length > 1000) {
        return {
          response: { valid: false },
          title: '⚠️: Excediste los caracteres permitidos',
          message:
            'El acuerdo por intercambio debe contener máximo 1000 caracteres',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const nonConsumableExist = await this._nonConsumableRepository.findOneBy({
        non_consumable_id: nonConsumableId,
        is_active: true,
      });

      if (!nonConsumableExist) {
        return {
          response: { valid: false },
          title: '⚠️: Insumo No Consumible no encontrado',
          message: 'El insumo no consumible no existe',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updatedNonConsumable = await this._nonConsumableRepository.update(
        nonConsumableExist.non_consumable_id,
        {
          provider_id,
          acquisition_id,
          agreement,
          last_updated_by: user.user_id,
        },
      );

      const data = await this.getNonConsumableSupplyById(nonConsumableId);

      return {
        response: data.response,
        title: '✅: El insumo No Consumible se ha actualizado correctamente',
        message: `El insumo ${nonConsumableId} se ha actualizado correctamente`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async discountNonConsumableSupply(
    user: TokenDto,
    updateNonConsumableSupplyDto: UpdateNonConsumableSupplyDto,
    nonConsumableId: string,
  ) {
    try {
      const { discount_type_id } = updateNonConsumableSupplyDto;

      if (!discount_type_id) {
        return {
          response: { valid: false },
          title: '⚠: Error al actualizar el insumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const nonConsumableExist = await this._nonConsumableRepository.findOneBy({
        non_consumable_id: nonConsumableId,
      });

      if (!nonConsumableExist) {
        return {
          response: { valid: false },
          title: '⚠： Insumo No Consumible no encontrado',
          message: 'El insumo no consumible no existe',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const newDiscount = await this._discountNonConsumableRepository.save({
        discount_type_id,
        non_consumable_id: nonConsumableId,
      });

      await this._nonConsumableRepository.update(nonConsumableId, {
        is_active: false,
        last_updated_by: user.user_id,
      });

      return {
        response: newDiscount,
        title: '✅: El insumo No Consumible se ha descontado correctamente',
        message: `El insumo ${nonConsumableId} se ha descontado correctamente y se ha desactivado`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async deleteNonConsumableSupply(user: TokenDto, nonConsumableId: string) {
    try {
      const nonConsumableExist: NonConsumable =
        await this._nonConsumableRepository.findOneBy({
          non_consumable_id: nonConsumableId,
          is_active: true,
        });

      if (!nonConsumableExist) {
        return {
          response: { valid: false },
          title: '⚠： Insumo No Consumible no encontrado',
          message: 'El insumo no consumible no existe',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this._nonConsumableRepository.update(nonConsumableId, {
        is_active: false,
        last_updated_by: user.user_id,
      });

      return {
        response: { valid: true },
        title: '✅: El insumo No Consumible se ha eliminado correctamente',
        message: `El insumo ${nonConsumableId} se ha eliminado correctamente`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
