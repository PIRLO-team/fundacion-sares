import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";

@Entity('non_consumable_status')
export class NonConsumable {
    @PrimaryColumn({
        type: 'bigint',
        name: 'non_consumable_status_id'
    })
    non_consumable_status_id: number;

    @Column({
        type: 'varchar',
        name: 'non_consumable_status_name',
    })
    non_consumable_status_name: string;
}