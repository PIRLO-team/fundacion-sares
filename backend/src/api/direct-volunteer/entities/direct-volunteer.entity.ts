import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";

@Entity('direct_volunteer')
export class DirectVolunteer extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'direct_volunteer_id',
        type: 'bigint',
    })
    direct_volunteer_id: number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'first_name',
        nullable: false
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'last_name',
        nullable: false
    })
    last_name: string;

    @Column({
        type: 'text',
        name: 'email',
        nullable: false
    })
    email: string;


    @Column({
        type: 'text',
        name: 'profession',
        nullable: true
    })
    profession: string;

    @Column({
        type: 'bigint',
        name: 'document',
        nullable: true
    })
    document: string;

    @Column({
        type: 'bigint',
        name: 'phone',
        nullable: true
    })
    phone: number;

    @Column({
        type: 'text',
        name: 'other_contact',
        nullable: true
    })
    other_contact: string;

    @Column({
        type: 'text',
        name: 'observation',
        nullable: true
    })
    observation: string;
}
