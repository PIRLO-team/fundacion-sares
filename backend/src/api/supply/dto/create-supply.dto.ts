export class CreateSupplyCategoryDto {
    public name: string;
    public type: number;
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
