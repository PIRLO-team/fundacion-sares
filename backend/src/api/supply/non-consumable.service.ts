import { HttpStatus, Injectable } from '@nestjs/common';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { SupplyCategoryRepository } from './repositories/supply-category.repository';
import { CategoryBySupplyRepository } from './repositories/category-by-supply.repository';
import { AcquisitionTypeRepository } from './repositories/acquisition-type.repository';
import { SupplyRepository } from './repositories/supply.repository';
import { DiscountSupplyRepository } from './repositories/discount-supply.repository';
import { DiscountTypeRepository } from './repositories/discount-type.repository';
import { NonConsumableRepository } from './repositories/non-consumable.repository';
import { NonConsumableStatusRepository } from './repositories/non-consumable-status.repository';
import { CreateNonConsumableCategorySupplyDto, CreateNonConsumableSupplyDto } from './dto/create-supply.dto';
import { Like } from 'typeorm';
import { NonConsumable } from './entities/non-consumable.entity';
import { UpdateNonConsumableSupplyDto } from './dto/update-supply.dto';
import { NonConsumableCategoryRepository } from './repositories/non-consumable-category.repository';
import { NonConsumableCategory } from './entities/non-consumable-category.entity';
import { NonConsumableStatus } from './entities/non-consumable-status.entity';

@Injectable()
export class NonConsumableService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _nonConsumableCategoryRepository: NonConsumableCategoryRepository,
    private readonly _nonConsumableRepository: NonConsumableRepository,
    private readonly _nonConsumableStatusRepository: NonConsumableStatusRepository,
    private readonly _acquisitionTypeRepository: AcquisitionTypeRepository,
    private readonly _supplyRepository: SupplyRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _supplyCategoryBySupplyRepository: CategoryBySupplyRepository,
    private readonly _discountSupplyRepository: DiscountSupplyRepository,
    private readonly _discountTypeRepository: DiscountTypeRepository,
  ) { }

  async getNonCosumableCategories() {
    try {
      const nonConsumableCategories: NonConsumableCategory[] = await this._nonConsumableCategoryRepository.find({
        where: {
          is_active: true
        }
      });

      if (!nonConsumableCategories.length) {
        return {
          response: { valid: true },
          title: '⚠: No hay categorias de insumos No Consumibles',
          message: 'No hay categorias de insumos No Consumibles',
          status: HttpStatus.BAD_REQUEST,
        }
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
      const nonConsumableStatus: NonConsumableStatus[] = await this._nonConsumableStatusRepository.find();
      console.log("🚀 ~ file: non-consumable.service.ts:66 ~ NonConsumableService ~ getNonConsumableStatus ~ nonConsumableStatus:", nonConsumableStatus)

      return {
        response: nonConsumableStatus,
        title: '✅: Tipos de insumos No Consumibles',
        message: 'Tipos de insumos No Consumibles',
        status: HttpStatus.OK,
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createNonConsumableHeaderSupply(user: TokenDto, createNonConsumableCategorySupplyDto: CreateNonConsumableCategorySupplyDto) {
    try {
      const {
        non_consumable_category_supply_name,
        non_consumable_status_id
      } = createNonConsumableCategorySupplyDto

      if (!non_consumable_category_supply_name || !non_consumable_status_id) {
        return {
          response: { valid: false },
          title: '⚠: Error al crear la categoria deinsumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        }
      }

      const newNonConsumableCategory: NonConsumableCategory = await this._nonConsumableCategoryRepository.save({
        non_consumable_category_supply_name,
        non_consumable_status_id,
        created_by: user.user_id,
        last_updated_by: user.user_id,
      })

      return {
        response: newNonConsumableCategory,
        title: '✅: La categoria de insumo No Consumible se ha creado correctamente',
        message: `La categoria ingresada ${non_consumable_category_supply_name} se ha creado correctamente`,
        status: HttpStatus.CREATED,
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createNonConsumableSupply(user: TokenDto, createNonConsumableSupplyDto: CreateNonConsumableSupplyDto) {
    try {
      const {
        non_consumable_category_supply_id,
        provider_id,
        acquisition_id,
        agreement,
      } = createNonConsumableSupplyDto;

      if (!non_consumable_category_supply_id || !provider_id || !acquisition_id) {
        return {
          response: { valid: false },
          title: '⚠: Error al crear el insumo No Consumible',
          message: 'Debe ingresar todos los datos requeridos',
          status: HttpStatus.BAD_REQUEST,
        }
      }

      const categoryExist = await this._nonConsumableCategoryRepository.findOne({
        where: {
          non_consumable_category_supply_id,
          is_active: true
        }
      });

      const supplyId = `${categoryExist.non_consumable_category_supply_name.substring(0, 3).toUpperCase()}`;
      const lastId = await this._nonConsumableRepository.count({
        where: {
          non_consumable_id: Like(`%${supplyId}%`),
        }
      });

      const countId = lastId + 1;
      const newNonConsumableId = `${supplyId}-${countId}`;

      const newNonConsumable: NonConsumable = await this._nonConsumableRepository.save({
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
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
