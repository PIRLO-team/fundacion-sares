import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";

@Entity('direct_volunteer')
export class DirectVolunteer extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'direct_volunteer_id',
        type: 'bigint',
    })
    direct_volunteer_id: number;

}
