import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSupplyCategoryDto {
  public supply_name: string;
  public supply_type_id: number;
  public min_quantity: number;
}
export class CreateCategoryBySupplyDto {
  public supply_id: number;
  public supply_category_name: string;
  public quantity: number;
}


export class CreateSupplyDto {
    public supply_category_id: number;
    public category_by_supply_id: number;
    public provider_id: number;
    public acquisition_id: number;
    public agreement: string;
    public expiration_date: Date;
    public quantity: number;
}
export class CreateNonConsumableCategorySupplyDto {
    public non_consumable_category_supply_name: string;
    public non_consumable_status_id: number;
}

export class CreateNonConsumableSupplyDto {
    public non_consumable_category_supply_id: number;
    public non_consumable_status_id: number;
    public provider_id: number;
    public acquisition_id: number;
    public agreement: string;
}
