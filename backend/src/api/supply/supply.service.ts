import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { SupplyCategoryRepository } from './repositories/supply-category.repository';
import { SupplyCategory } from './entities/supply-category.entity';
import { CategoryBySupply } from './entities/category-by-supply.entity';
import { CategoryBySupplyRepository } from './repositories/category-by-supply.repository';
import { AcquisitionTypeRepository } from './repositories/acquisition-type.repository';
import { SupplyRepository } from './repositories/supply.repository';
import { Supply } from './entities/supply.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
import { DiscountSupplyRepository } from './repositories/discount-supply.repository';
import { AcquisitionType } from './entities/acquisition-type.entity';
import { DiscountTypeRepository } from './repositories/discount-type.repository';
import { DiscountType } from './entities/discount-type.entity';
import { DiscountSupply } from './entities/discount-supply.entity';

@Injectable()
export class SupplyService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _acquisitionTypeRepository: AcquisitionTypeRepository,
    private readonly _supplyRepository: SupplyRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _supplyCategoryBySupplyRepository: CategoryBySupplyRepository,
    private readonly _discountSupplyRepository: DiscountSupplyRepository,
    private readonly _discountTypeRepository: DiscountTypeRepository,
  ) { }

  async getAcquisitionTypes() {
    try {
      const acquisitionTypes: AcquisitionType[] = await this._acquisitionTypeRepository.find();

      return {
        response: acquisitionTypes,
        title: '✅: Todos los tipos de adquisición',
        message: 'Lista de tipos de adquisición',
        status: HttpStatus.OK
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getDiscountTypes() {
    try {
      const discountTypes: DiscountType[] = await this._discountTypeRepository.find();

      return {
        response: discountTypes,
        title: '✅: Todos los tipos de adquisición',
        message: 'Lista de tipos de adquisición',
        status: HttpStatus.OK
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getExpired() {
    try {
      const supplyQuery: Supply[] = await this._supplyRepository.find({
        where: {
          is_active: true,
          expiration_date: LessThanOrEqual(new Date())

        },
        relations: [
          'supplyCategory',
          'categoryBySupply',
          'providerSupply',
          'acquisitionTypeSupply',
        ]
      });

      if (!supplyQuery.length) {
        return {
          response: { valid: true },
          title: '⚠: Sin datos',
          message: 'No hay elementos caducados',
          status: HttpStatus.OK
        }
      }

      return {
        response: supplyQuery,
        title: '✅: Todos los tipos de adquisición',
        message: 'Lista de tipos de adquisición',
        status: HttpStatus.OK
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getSupply() {
    try {
      const supplyQuery: Supply[] = await this._supplyRepository.find({
        relations: [
          'supplyCategory',
          'categoryBySupply',
          'providerSupply',
          'acquisitionTypeSupply',
        ],
        where: {
          is_active: true
        },
      });

      if (!supplyQuery.length) {
        return {
          response: [],
          title: '⚠: Sin datos',
          message: 'No hay datos',
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        response: supplyQuery,
        title: '✅: Todas las categorias',
        message: 'Lista de todas las categorias',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createSupply(user: TokenDto, createSupplyDto: CreateSupplyDto) {
    try {
      const {
        supply_category_id,
        category_by_supply_id,
        provider_id,
        acquisition_id,
        agreement,
        expiration_date,
        quantity
      } = createSupplyDto

      if (!supply_category_id || !category_by_supply_id || !provider_id || !acquisition_id || !quantity) {
        return {
          response: { valid: false },
          title: '⚠: Datos no actualizados',
          message: 'Faltan campos por completar',
          status: HttpStatus.BAD_REQUEST
        }
      }

      const supplyExist: Supply[] = await this._supplyRepository.find({
        where: {
          supply_category_id,
          category_by_supply_id,
          acquisition_id
        }
      });

      if (supplyExist.length) {
        return {
          response: { valid: false },
          title: '⚠️: Datos existentes',
          message: 'Ya existe una entrada con los mismos datos',
          status: HttpStatus.CONFLICT
        }
      }

      const supplyCategory: SupplyCategory = await this._supplyCategoryRepository.findOne({
        where: {
          supply_id: supply_category_id,
          is_active: true
        },
        relations: ['supplyType']
      });

      const { supply_name, supplyType } = supplyCategory;
      const supply_name_prefix = supply_name?.substring(0, 2).toUpperCase();
      const supply_type_prefix = supplyType?.supply_type_name?.substring(0, 2).toUpperCase();
      const supplyId = `${supply_type_prefix}-${supply_name_prefix}`;

      const lastId = await this._supplyRepository.count({
        where: {
          supply_id: Like(`%${supplyId}%`),
        }
      });

      const countId = lastId + 1;
      const newSupplyId = `${supplyId}-${countId}`;


      const newSupply = new Supply()
      newSupply.supply_category_id = supply_category_id;
      newSupply.category_by_supply_id = category_by_supply_id;
      newSupply.provider_id = provider_id;
      newSupply.acquisition_id = acquisition_id;
      newSupply.agreement = agreement;
      newSupply.expiration_date = expiration_date;
      newSupply.quantity = quantity;
      newSupply.supply_id = newSupplyId;
      newSupply.created_by = user.user_id;
      newSupply.last_updated_by = user.user_id;
      await this._supplyRepository.save(newSupply);

      return {
        response: newSupply,
        title: '✅: Se creo la entrada',
        message: 'Hemos creado la entrada satisfactoriamente',
        status: HttpStatus.CREATED
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getSupplyById(id: string) {
    try {
      const supply: Supply = await this._supplyRepository.findOne({
        where: {
          supply_id: id,
          is_active: true
        },
        relations: [
          'supplyCategory',
          'categoryBySupply',
          'providerSupply',
          'acquisitionTypeSupply',
        ]
      });

      if (!supply) {
        return {
          response: {},
          title: '⚠: Entrada no existente',
          message: 'La entrada no existe',
          status: HttpStatus.NOT_FOUND
        }
      }

      return {
        response: supply,
        title: '✅: Entrada',
        message: 'Entrada encontrada',
        status: HttpStatus.OK
      }
    }
    catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async updateSupply(id: string, user: TokenDto, updateSupplyDto: UpdateSupplyDto) {
    try {
      const {
        supply_category_id,
        category_by_supply_id,
        provider_id,
        acquisition_id,
        agreement,
        expiration_date,
        quantity
      } = updateSupplyDto;

      if (!supply_category_id || !category_by_supply_id || !provider_id || !acquisition_id || !quantity) {
        return {
          response: { valid: false },
          title: '⚠: Datos no actualizados',
          message: 'Faltan campos por completar',
          status: HttpStatus.BAD_REQUEST
        }
      };

      const supplyExist: Supply = await this._supplyRepository.findOneBy({
        supply_id: id,
        is_active: true
      });

      if (!supplyExist) {
        return {
          response: { valid: false },
          title: '⚠: Entrada no existente',
          message: 'La entrada no existe, por favor verifica los datos',
          status: HttpStatus.NOT_FOUND
        }
      };

      const categoryBySupplyExist: CategoryBySupply = await this._supplyCategoryBySupplyRepository.findOneBy({
        supply_id: supply_category_id
      });

      if (!categoryBySupplyExist) {
        return {
          response: { valid: false },
          title: '⚠: Categoría no existente',
          message: 'La categoría no existe',
          status: HttpStatus.NOT_FOUND
        }
      };

      await this._supplyRepository.update(id, {
        supply_category_id,
        category_by_supply_id,
        provider_id,
        acquisition_id,
        agreement,
        expiration_date,
        quantity,
        last_updated_by: user.user_id,
      });

      const data = await this.getSupplyById(id);

      return {
        response: data.response,
        title: '✅: Se actualizo la entrada',
        message: 'Hemos actualizado la entrada satisfactoriamente',
        status: HttpStatus.OK
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async updatedQuantity(id: string, user: TokenDto, updateSupplyDto: UpdateSupplyDto) {
    try {
      const { quantity, discount_type_id } = updateSupplyDto;

      if (!quantity || !discount_type_id) {
        return {
          response: { valid: false },
          title: '⚠: Por favor diga la cantidad y el motivo',
          message: 'Establezca la cantidad a descontar del inventario y el motivo',
          status: HttpStatus.BAD_REQUEST
        }
      }

      const supplyExist: Supply = await this._supplyRepository.findOneBy({
        supply_id: id,
        is_active: true
      });

      if (!supplyExist) {
        return {
          response: { valid: false },
          title: '⚠: Entrada no existente',
          message: 'La entrada no existe, por favor verifica los datos',
          status: HttpStatus.NOT_FOUND
        }
      };

      const newQuantity = supplyExist.quantity - quantity;
      let newSupply: DiscountSupply;
      const newDiscountSupply = new DiscountSupply();
      newDiscountSupply.quantity = quantity;
      newDiscountSupply.discount_type_id = discount_type_id;
      newDiscountSupply.supply_id = id;
      newSupply =  await this._discountSupplyRepository.save(newDiscountSupply);

      await this._supplyRepository.update(id, {
        quantity: newQuantity,
        last_updated_by: user.user_id,
      });

      const data = await this.getSupplyById(id);

      return {
        response: {
          newSupply,
          data: data.response
        },
        title: '✅: Se actualizo la entrada',
        message: 'Hemos actualizado la entrada satisfactoriamente',
        status: HttpStatus.OK
      };
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async deleteSupply(id: string, user: TokenDto) {
    try {
      const supplyExist: Supply = await this._supplyRepository.findOne({
        where: {
          supply_id: id,
          is_active: true
        },
        relations: [
          'supplyCategory'
        ]
      });

      if (!supplyExist) {
        return {
          response: { valid: false },
          title: `⚠︰ La entrada no existe`,
          message: `Por favor, ingresa una entrada valida`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      await this._supplyRepository.update(id, {
        is_active: false,
        last_updated_by: user.user_id
      });

      return {
        response: { valid: true },
        title: `✅: El insumo ha sido desactivado`,
        message: `El insumo ${supplyExist.supplyCategory.supply_name} fue desactivado correctamente`,
        status: HttpStatus.OK
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
