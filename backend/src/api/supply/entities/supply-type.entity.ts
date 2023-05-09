import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplyCategory } from "./supply-category.entity";

@Entity('supply_type')
export class SupplyType {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'supply_type_id'
    })
    supply_type_id: number;

    @Column({
        type: 'varchar',
        name: 'supply_type_name'
    })
    supply_type_name: string;

    @OneToMany(() => SupplyCategory, s => s.supplyType)
    supplyType: SupplyCategory[];
}
