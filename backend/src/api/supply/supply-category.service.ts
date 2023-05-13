import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplyCategoryDto } from './dto/create-supply.dto';
import { CreateCategoryBySupplyDto } from './dto/create-supply.dto';
import { UpdateCategoryBySupplyCategoryDto, UpdateSupplyCategoryDto } from './dto/update-supply.dto';
import { HandlersError } from '../../shared/handlers/error.utils';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { SupplyCategoryRepository } from './repositories/supply-category.repository';
import { SupplyTypeRepository } from './repositories/supply-type.repository';
import { SupplyCategory } from './entities/supply-category.entity';
import { SupplyType } from './entities/supply-type.entity';
import { CategoryBySupply } from './entities/category-by-supply.entity';
import { CategoryBySupplyRepository } from './repositories/category-by-supply.repository';

@Injectable()
export class SupplyCategoryService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _supplyTypeRepository: SupplyTypeRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _supplyCategoryBySupplyRepository: CategoryBySupplyRepository,
  ) { }

  async getSupplyTypes() {
    try {
      const supplyTypes: SupplyType[] = await this._supplyTypeRepository.find();

      return {
        response: supplyTypes,
        title: '✅: Tipos de insumos',
        message: 'Todos los tipos de insumos',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getSupplyCategories() {
    try {
      const supplyCategory: SupplyCategory[] = await this._supplyCategoryRepository.find();

      return {
        response: supplyCategory,
        title: '✅: Insumos',
        message: 'Todos los insumos',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getCategory() {
    try {
      const supplyCategoryQuery: SupplyCategory[] = await this._supplyCategoryRepository.find({
        relations: [
          'supplyType',
          'supplyCategory'
        ],
        where: {
          is_active: true
        },
      });

      const supplyCategory: SupplyCategory[] = supplyCategoryQuery.map(supply => ({
        ...supply,
        supplyCategory: supply.supplyCategory.filter(category => category.is_active === true)
      }));



      return {
        response: supplyCategory,
        title: '✅: Todas las categorias',
        message: 'Lista de todas las categorias',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async getCategoryById(id: number) {
    try {
      const supplyCategoryQuery: SupplyCategory[] = await this._supplyCategoryRepository.find({
        where: {
          supply_id: id,
          is_active: true
        },
        relations: [
          'supplyType',
          'supplyCategory'
        ]
      });


      if (!supplyCategoryQuery) {
        return {
          response: { valid: false },
          title: `⚠︰ La categoria no existe`,
          message: `La categoria con id ${id} no existe`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const supplyCategory: SupplyCategory[] = supplyCategoryQuery.map(supply => ({
        ...supply,
        supplyCategory: supply.supplyCategory.filter(category => category.is_active === true)
      }));

      return {
        response: supplyCategory[0],
        title: '✅: Todas las categorias',
        message: 'Lista de todas las categorias',
        status: HttpStatus.OK
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createSupplyCategory(user: TokenDto, createSupplyDto: CreateSupplyCategoryDto) {
    try {
      const { name, type, min_quantity } = createSupplyDto;

      if (!name || !type || !min_quantity) {
        return {
          response: { valid: false },
          title: `⚠︰ Campos incompletos`,
          message: `Por favor, llene todos los campos`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const nameExist: SupplyCategory[] = await this._supplyCategoryRepository.find({
        where: {
          supply_name: name,
          is_active: true
        }
      });

      if (nameExist.length) {
        return {
          response: { valid: false },
          title: `⚠︰ El nombre ya existe`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const supplyCategory: SupplyCategory = await this._supplyCategoryRepository.save({
        supply_name: name,
        supply_type_id: type,
        min_quantity: min_quantity,
        created_by: user.user_id,
        last_updated_by: user.user_id
      });

      return {
        response: supplyCategory,
        title: `✅: La categoria ha sido creada`,
        message: `La categoria ${name} ha sido creada satisfctoriamente`,
        status: HttpStatus.CREATED
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async updateSupplyCategory(id: number, user: TokenDto, updateSupplyDto: UpdateSupplyCategoryDto, updateCategoryBySupplyCategoryDto: UpdateCategoryBySupplyCategoryDto) {
    try {
      const supplyExist: SupplyCategory = await this._supplyCategoryRepository.findOneBy({
        supply_id: id,
        is_active: true
      });

      if (!supplyExist) {
        return {
          response: { valid: false },
          title: `⚠︰ La categoria no existe`,
          message: 'La categoria que quieres actualizar no existe',
          status: HttpStatus.NOT_FOUND
        }
      }

      const updateSupplyCategory = await this._supplyCategoryRepository.update({
        supply_id: id,
      }, {
        supply_name: updateSupplyDto?.name,
        supply_type_id: updateSupplyDto?.type,
        min_quantity: updateSupplyDto?.min_quantity,
        is_active: updateSupplyDto?.is_active,
        last_updated_by: user.user_id
      });

      const categoryBySupply = updateCategoryBySupplyCategoryDto.category_by_suppply;

      if (updateSupplyDto.is_active === true) {
        if (categoryBySupply.length) {
          for (const category of categoryBySupply) {
            const categoryExists = await this._supplyCategoryBySupplyRepository.findOneBy({
              supply_id: id,
              supply_category_name: category?.supply_category_name,
            });

            if (!categoryExists) {
              const newCategoryBySupply = new CategoryBySupply();
              newCategoryBySupply.supply_id = id;
              newCategoryBySupply.supply_category_name = category?.supply_category_name.toUpperCase();
              newCategoryBySupply.quantity = category?.quantity;
              newCategoryBySupply.created_by = user.user_id;
              newCategoryBySupply.last_updated_by = user.user_id;

              await this._supplyCategoryBySupplyRepository.save(newCategoryBySupply);
            }

            if (categoryExists) {
              await this._supplyCategoryBySupplyRepository.update(
                {
                  supply_category_id: categoryExists.supply_category_id,
                },
                {
                  supply_category_name: category.supply_category_name,
                  quantity: category.quantity,
                  last_updated_by: user.user_id,
                  is_active: true
                }
              );
            }
          }
        }

        const existingCategories = await this._supplyCategoryBySupplyRepository.findBy({
          supply_id: id,
          is_active: true
        });

        for (const existingCategory of existingCategories) {
          const isCategoryProvided = categoryBySupply.some(category => category.supply_category_name === existingCategory.supply_category_name);

          if (!isCategoryProvided) {
            existingCategory.is_active = false;
            existingCategory.last_updated_by = user.user_id;
            await this._supplyCategoryBySupplyRepository.save(existingCategory);
          }
        }
      }
      const data = await this.getCategoryById(id);

      return {
        response: data.response,
        title: `✅: La categoria ha sido actualizada`,
        message: `La categoria ${id} ha sido desactivada satisfactoriamente`,
        status: HttpStatus.OK
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async createCategoryBySupply(user: TokenDto, createCategoryBySupplyDto: CreateCategoryBySupplyDto) {
    try {
      const { supply_id, supply_category_name, quantity } = createCategoryBySupplyDto;

      if (!supply_category_name || !supply_id || !quantity) {
        return {
          response: { valid: false },
          title: `⚠︰ Campos incompletos`,
          message: `Por favor, llene todos los campos`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const supplyCategory = await this._supplyCategoryBySupplyRepository.findOneBy({
        supply_id: supply_id,
        is_active: true
      });

      if (!supplyCategory) {
        return {
          response: { valid: false },
          title: `⚠︰ La categoria no existe`,
          message: `Por favor, ingresa una categoria valida`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const categoryBySupplyExist: CategoryBySupply[] = await this._supplyCategoryBySupplyRepository.find({
        where: {
          supply_category_name,
          is_active: true
        }
      });

      if (categoryBySupplyExist.length) {
        return {
          response: { valid: false },
          title: `⚠︰ La categoria ya existe`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      const newCategoryBySupply: CategoryBySupply = await this._supplyCategoryBySupplyRepository.save({
        supply_category_name,
        supply_id,
        quantity,
        created_by: user.user_id,
        last_updated_by: user.user_id
      });

      return {
        response: newCategoryBySupply,
        title: `✅ La categoria del insumo ha sido creada`,
        message: `La categoria del insumo ${name} ha sido creada satisfctoriamente`,
        status: HttpStatus.CREATED
      }
    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }

  async deleteSupplyCategory(id: number, user: TokenDto) {
    try {
      const supplyCategoryExist: SupplyCategory = await this._supplyCategoryRepository.findOne({
        where: {
          supply_id: id,
          is_active: true
        }
      });

      if (!supplyCategoryExist) {
        return {
          response: { valid: false },
          title: `⚠︰ La categoria no existe`,
          message: `Por favor, ingresa una categoria valida`,
          status: HttpStatus.BAD_REQUEST
        }
      }

      await this._supplyCategoryRepository.update(id, {
        is_active: false,
        last_updated_by: user.user_id
      });

      return {
        response: { valid: true },
        title: `✅ La categoria ha sido desactivada`,
        message: `La categoria ${supplyCategoryExist.supply_name} fue desactivada correctamente`,
        status: HttpStatus.OK
      }

    } catch (error) {
      return this._handlerError.returnErrorRes({ error, debug: true });
    }
  }
}
