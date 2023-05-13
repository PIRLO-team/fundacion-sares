import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supply } from "../../supply/entities/supply.entity";
import { NonConsumable } from "../../supply/entities/non-consumable.entity";

@Entity('provider')
export class Provider {
    @PrimaryGeneratedColumn({
        name: 'provider_id',
        type: 'bigint'
    })
    provider_id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 45,
    })
    name: string;

    @Column({
        type: 'text',
        name: 'email',
        nullable: false
    })
    email: string;

    @Column({
        type: 'bigint',
        name: 'nit',
        nullable: false
    })
    nit: number;

    @Column({
        type: 'text',
        name: 'other_contact',
        nullable: true
    })
    other_contact: string;

    @Column({
        type: 'bigint',
        name: 'phone',
        nullable: true
    })
    phone: number;

    @OneToMany(type => Supply, s => s.providerSupply)
    providerSupply: Supply[];

    @OneToMany(type => NonConsumable, nc => nc.providerNonConsumable)
    providerNonConsumable: Supply[];
}
