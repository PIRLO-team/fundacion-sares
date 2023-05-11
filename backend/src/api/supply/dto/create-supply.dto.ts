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
