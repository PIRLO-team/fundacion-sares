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
import { Like } from 'typeorm';

@Injectable()
export class SupplyService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _acquisitionTypeRepository: AcquisitionTypeRepository,
    private readonly _supplyRepository: SupplyRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _supplyCategoryBySupplyRepository: CategoryBySupplyRepository,
  ) { }

  async getAcquisitionTypes() {
    try {
      const acquisitionTypes = await this._acquisitionTypeRepository.find();

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

      const supplyExist: Supply[] = await this._supplyRepository.find({
        where: {
          supply_category_id,
          category_by_supply_id
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

      const categoryBySupplyExist: CategoryBySupply = await this._supplyCategoryBySupplyRepository.findOne({
        where: {
          supply_category_id: category_by_supply_id,
          is_active: true
        }
      });

      if (!categoryBySupplyExist) {
        return {
          response: { valid: false },
          title: '⚠ｍ: Categoría no existente',
          message: 'La categoría no existe',
          status: HttpStatus.NOT_FOUND
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
          is_active: true,
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

  async updateSupply(id: number, user: TokenDto, updateSupplyDto: UpdateSupplyDto) {
    try {


      return {
        response: { valid: true },
        title: '✅: Se actualizo la entrada',
        message: 'Hemos actualizado la entrada satisfactoriamente',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
