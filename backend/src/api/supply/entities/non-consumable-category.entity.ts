import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { NonConsumableStatus } from "./non-consumable-status.entity";
import { NonConsumable } from "./non-consumable.entity";

@Entity('non_consumable_category')
export class NonConsumableCategory extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'non_consumable_category_supply_id'
    })
    non_consumable_category_supply_id: number;

    @Column({
        type: 'varchar',
        name: 'non_consumable_category_supply_name',
    })
    non_consumable_category_supply_name: string;

    @Column({
        type: 'bigint',
        name: 'non_consumable_status_id'
    })
    non_consumable_status_id: number;

    @ManyToOne(type => NonConsumableStatus, nct => nct.non_consumable_status_id)
    @JoinColumn({
        name: 'non_consumable_status_id'
    })
    nonConsumableStatus: NonConsumableStatus[];

    @OneToMany(type => NonConsumable, nc => nc.non_consumable_category_supply_id)
    nonConsumableCategory: NonConsumable[];
}
