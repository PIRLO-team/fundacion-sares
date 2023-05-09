import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { SupplyCategory } from "./supply-category.entity";
import { Supply } from "./supply.entity";

@Entity('category_by_supply')
export class CategoryBySupply extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'supply_category_id'
    })
    supply_category_id: number;

    @Column({
        type: 'varchar',
        name: 'supply_category_name',
    })
    supply_category_name: string;

    @Column({
        type: 'bigint',
        name: 'quantity'
    })
    quantity: number;

    @Column({
        type: 'bigint',
        name: 'supply_id'
    })
    supply_id: number;

    @ManyToOne(() => SupplyCategory, s => s.supply_id)
    @JoinColumn({
        name: 'supply_id'
    })
    supplyCategory: SupplyCategory;

    @OneToMany(type => Supply, s => s.categoryBySupply)
    categoryBySupply: Supply[];
}
