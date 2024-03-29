import { PartialType } from '@nestjs/mapped-types';
import { CreateNonConsumableSupplyDto, CreateSupplyCategoryDto, CreateSupplyDto } from './create-supply.dto';
import { CreateCategoryBySupplyDto } from './create-supply.dto';

export class UpdateSupplyCategoryDto extends PartialType(CreateSupplyCategoryDto) {
    public is_active: boolean;
}

export class UpdateCategoryBySupplyCategoryDto extends PartialType(CreateCategoryBySupplyDto) {
    public supplyCategory: CategoryBySupply[];
}
export class CategoryBySupply {
    public supply_category_id: number;
    public supply_category_name: string;
    public quantity: number;
}

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) { 
    public discount_type_id: number;
}

export class UpdateNonConsumableSupplyDto extends PartialType(CreateNonConsumableSupplyDto) {
    public discount_type_id: number;

}
