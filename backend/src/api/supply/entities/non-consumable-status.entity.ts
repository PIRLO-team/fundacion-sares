import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NonConsumable } from "./non-consumable.entity";
import { NonConsumableCategory } from "./non-consumable-category.entity";

@Entity('non_consumable_status')
export class NonConsumableStatus {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'non_consumable_status_id'
    })
    non_consumable_status_id: number;

    @Column({
        type: 'varchar',
        name: 'non_consumable_status_name',
    })
    non_consumable_status_name: string;

    @OneToMany(() => NonConsumableCategory, nc => nc.nonConsumableStatus)
    nonConsumableStatus: NonConsumableCategory[];
}