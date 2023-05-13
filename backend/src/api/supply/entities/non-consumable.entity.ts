import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { Provider } from "../../provider/entities/provider.entity";
import { AcquisitionType } from "./acquisition-type.entity";
import { NonConsumableStatus } from "./non-consumable-status.entity";
import { NonConsumableCategory } from "./non-consumable-category.entity";

@Entity('non_consumable')
export class NonConsumable extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        name: 'non_consumable_id',
        length: 50,
    })
    non_consumable_id: string;

    @Column({
        type: 'bigint',
        name: 'non_consumable_category_supply_id',
    })
    non_consumable_category_supply_id: number;

    @Column({
        type: 'bigint',
        name: 'provider_id',
        nullable: true
    })
    provider_id: number;

    @Column({
        type: 'bigint',
        name: 'acquisition_id',
        nullable: true
    })
    acquisition_id: number;

    @Column({
        type: 'text',
        name: 'agreement',
        nullable: true
    })
    agreement: string;

    @Column({
        type: 'date',
        name: 'damage_date',
        nullable: true
    })
    damage_date: Date;

    @Column({
        type: 'date',
        name: 'non_sterilized_date',
        nullable: true
    })
    non_sterilized_date: Date;

    @ManyToOne(type => NonConsumableCategory, ncc => ncc.non_consumable_category_supply_id)
    @JoinColumn({
        name: 'non_consumable_category_supply_id'
    })
    nonConsumableCategory: NonConsumableCategory[];

    @ManyToOne(type => Provider, p => p.provider_id)
    @JoinColumn({
        name: 'provider_id'
    })
    providerNonConsumable: Provider[];

    @ManyToOne(type => AcquisitionType, at => at.acquisition_type_id)
    @JoinColumn({
        name: 'acquisition_id'
    })
    acquisitionTypeNonConsumable: AcquisitionType[];
}
