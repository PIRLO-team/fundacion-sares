import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { SupplyType } from "./supply-type.entity";
import { CategoryBySupply } from "./category-by-supply.entity";
import { Supply } from "./supply.entity";

@Entity('supply_category')
export class SupplyCategory extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'supply_id'
    })
    supply_id: number;

    @Column({
        type: 'varchar',
        name: 'supply_name',
    })
    supply_name: string;

    @Column({
        type: 'bigint',
        name: 'min_quantity'
    })
    min_quantity: number;

    @Column({
        type: 'bigint',
        name: 'supply_type_id'
    })
    supply_type_id: number;

    @ManyToOne(type => SupplyType, st => st.supply_type_id)
    @JoinColumn({
        name: 'supply_type_id',
    })
    supplyType: SupplyType;

    @OneToMany(type => CategoryBySupply, sc => sc.supplyCategory)
    supplyCategory: CategoryBySupply[];

    @OneToMany(type => Supply, s => s.supplyCategory)
    supply: Supply[];
}
