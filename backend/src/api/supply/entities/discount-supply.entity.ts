import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplyType } from "./supply-type.entity";
import { SupplyCategory } from "./supply-category.entity";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { Provider } from "../../provider/entities/provider.entity";
import { CategoryBySupply } from "./category-by-supply.entity";
import { AcquisitionType } from "./acquisition-type.entity";
import { Supply } from "./supply.entity";
import { DiscountType } from "./discount-type.entity";

@Entity('discount_supply')
export class DiscountSupply {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'discount_supply_id',
    })
    discount_supply_id: string;

    @Column({
        type: 'bigint',
        name: 'quantity'
    })
    quantity: number;

    @Column({
        type: 'bigint',
        name: 'discount_type_id',
    })
    discount_type_id: number;

    @Column({
        type: 'varchar',
        name: 'supply_id',
    })
    supply_id: string;

    @ManyToOne(() => Supply, s => s.supply_id)
    @JoinColumn({
        name: 'supply_id'
    })
    supplyDiscount: Supply;

    @ManyToOne(() => DiscountType, dt => dt.discount_type_id)
    @JoinColumn({
        name: 'discount_type_id'
    })
    discountSupplyType: DiscountType[];
}

