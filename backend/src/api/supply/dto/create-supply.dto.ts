import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSupplyCategoryDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  public name: string;

  public type: number;

  @IsNotEmpty({ message: 'La cantidad mínima es requerida' })
  @IsNumber({}, { message: 'La cantidad mínima debe ser un número' })
  @Min(0, { message: 'La cantidad mínima debe ser igual o mayor a 0' })
  public min_quantity: number;
}
export class CreateCategoryBySupplyDto {
  @IsNotEmpty({ message: 'El insumo del suministro es requerido' })
  @IsNumber({}, { message: 'El insumo del suministro debe ser un número' })
  public supply_id: number;

  @IsNotEmpty({ message: 'El nombre de la categoría de suministro es requerido' })
  public supply_category_name: string;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(0, { message: 'La cantidad debe ser igual o mayor a 0' })
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
