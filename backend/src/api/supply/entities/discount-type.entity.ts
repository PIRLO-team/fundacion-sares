import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supply } from "./supply.entity";
import { DiscountSupply } from "./discount-supply.entity";

@Entity('discount_type')
export class DiscountType {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'discount_type_id'
    })
    discount_type_id: number;

    @Column({
        type: 'varchar',
        name: 'discount_type_name'
    })
    discount_type_name: string;

    @OneToMany(() => DiscountSupply, ds => ds.discountType)
    discountSupply: DiscountSupply[];
}
