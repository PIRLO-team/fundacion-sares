import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { Provider } from "../../provider/entities/provider.entity";
import { AcquisitionType } from "./acquisition-type.entity";

@Entity('non_consumable')
export class NonConsumable extends BaseEntity {
    @PrimaryColumn({
        type: 'bigint',
        name: 'non_consumable_id'
    })
    non_consumable_id: number;

    @Column({
        type: 'varchar',
        name: 'non_consumable_name',
    })
    non_consumable_name: string;

    @Column({
        type: 'bigint',
        name: 'provider_id'
    })
    provider_id: number;

    @Column({
        type: 'bigint',
        name: 'adquisition_id'
    })
    adquisition_id: number;

    @Column({
        type: 'text',
        name: 'agreement'
    })
    agreement: string;

    @Column({
        type: 'bigint',
        name: 'non_consumable_status_id'
    })
    non_consumable_status_id: number;

    @Column({
        type: 'date',
        name: 'damage_date'
    })
    damage_date: Date;

    @Column({
        type: 'date',
        name: 'non_sterilized_date'
    })
    non_sterilized_date: Date;

    @ManyToOne(type => Provider, p => p.provider_id)
    @JoinColumn({
        name: 'provider_id'
    })
    providerNonConsumable: Provider;

    @ManyToOne(type => AcquisitionType, at => at.acquisition_type_id)
    @JoinColumn({
        name: 'adquisition_id'
    })
    acquisitionTypeNonConsumable: AcquisitionType;

}
