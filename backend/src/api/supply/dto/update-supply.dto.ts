import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyCategoryDto, CreateSupplyDto } from './create-supply.dto';
import { CreateCategoryBySupplyDto } from './create-supply.dto';

export class UpdateSupplyCategoryDto extends PartialType(CreateSupplyCategoryDto) {
    public is_active: boolean;
}

export class UpdateCategoryBySupplyCategoryDto extends PartialType(CreateCategoryBySupplyDto) {
    public category_by_suppply: CategoryBySupply[];
}
export class CategoryBySupply {
    public supply_category_id: number;
    public supply_category_name: string;
    public quantity: number;
}

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) { }

