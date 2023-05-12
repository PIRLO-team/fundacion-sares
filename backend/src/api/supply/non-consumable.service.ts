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
export class NonConsumableService {
  constructor(
    private readonly _handlerError: HandlersError,
    private readonly _acquisitionTypeRepository: AcquisitionTypeRepository,
    private readonly _supplyRepository: SupplyRepository,
    private readonly _supplyCategoryRepository: SupplyCategoryRepository,
    private readonly _supplyCategoryBySupplyRepository: CategoryBySupplyRepository,
    private readonly _discountSupplyRepository: DiscountSupplyRepository,
    private readonly _discountTypeRepository: DiscountTypeRepository,
  ) { }

}
