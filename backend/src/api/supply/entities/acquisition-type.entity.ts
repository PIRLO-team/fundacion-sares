import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplyCategory } from "./supply-category.entity";
import { Supply } from "./supply.entity";
import { NonConsumable } from "./non-consumable.entity";

@Entity('acquisition_type')
export class AcquisitionType {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'acquisition_type_id'
    })
    acquisition_type_id: number;

    @Column({
        type: 'varchar',
        name: 'acquisition_name'
    })
    acquisition_name: string;

    @OneToMany(() => Supply, s => s.acquisitionTypeSupply)
    acquisitionTypeSupply: Supply[];

    @OneToMany(() => NonConsumable, nc => nc.acquisitionTypeNonConsumable)
    acquisitionTypeNonConsumable: Supply[];
}
