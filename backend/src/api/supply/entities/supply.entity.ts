import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplyType } from "./supply-type.entity";
import { SupplyCategory } from "./supply-category.entity";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { Provider } from "../../provider/entities/provider.entity";
import { CategoryBySupply } from "./category-by-supply.entity";
import { AcquisitionType } from "./acquisition-type.entity";
import { DiscountSupply } from "./discount-supply.entity";

@Entity('supply')
export class Supply extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        name: 'supply_id',
        length: 50,
    })
    supply_id: string;

    @Column({
        type: 'bigint',
        name: 'supply_category_id'
    })
    supply_category_id: number;

    @Column({
        type: 'bigint',
        name: 'category_by_supply_id'
    })
    category_by_supply_id: number;

    @Column({
        type: 'bigint',
        name: 'provider_id'
    })
    provider_id: number;

    @Column({
        type: 'bigint',
        name: 'acquisition_id'
    })
    acquisition_id: number;

    @Column({
        type: 'text',
        name: 'agreement'
    })
    agreement: string;

    @Column({
        type: 'date',
        name: 'expiration_date'
    })
    expiration_date: Date;

    @Column({
        type: 'bigint',
        name: 'quantity'
    })
    quantity: number;

    @ManyToOne(type => SupplyCategory, sc => sc.supply_id)
    @JoinColumn({
        name: 'supply_category_id'
    })
    supplyCategory: SupplyCategory;

    @ManyToOne(type => CategoryBySupply, cbs => cbs.supply_category_id)
    @JoinColumn({
        name: 'category_by_supply_id'
    })
    categoryBySupply: CategoryBySupply;

    @ManyToOne(type => Provider, p => p.providerSupply)
    @JoinColumn({
        name: 'provider_id'
    })
    providerSupply: Provider;

    @ManyToOne(type => AcquisitionType, at => at.acquisition_type_id)
    @JoinColumn({
        name: 'acquisition_id'
    })
    acquisitionTypeSupply: AcquisitionType;

    @OneToMany(type => DiscountSupply, st => st.supplyDiscount)
    supplyDiscount: DiscountSupply[];  
}