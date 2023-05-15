import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplyType } from "./supply-type.entity";
import { SupplyCategory } from "./supply-category.entity";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { Provider } from "../../provider/entities/provider.entity";
import { CategoryBySupply } from "./category-by-supply.entity";
import { AcquisitionType } from "./acquisition-type.entity";
import { Supply } from "./supply.entity";
import { DiscountType } from "./discount-type.entity";
import { NonConsumable } from "./non-consumable.entity";

@Entity('discount_non_consumable')
export class DiscountNonConsumable {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'discount_supply_id',
    })
    discount_supply_id: string;

    @Column({
        type: 'bigint',
        name: 'discount_type_id',
    })
    discount_type_id: number;

    @Column({
        type: 'varchar',
        name: 'non_consumable_id',
    })
    non_consumable_id: string;

    @ManyToOne(() => NonConsumable, nc => nc.non_consumable_id)
    @JoinColumn({
        name: 'non_consumable_id'
    })
    nonConsumableDiscount: NonConsumable[];

    @ManyToOne(() => DiscountType, dt => dt.discount_type_id)
    @JoinColumn({
        name: 'discount_type_id'
    })
    discountNonConsumableType: DiscountType[];
};

