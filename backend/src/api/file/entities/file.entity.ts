import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entity/base-entity";
import { User } from "../../../auth/entities/user.entity";

@Entity('file')
export class File extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'file_id',
        type: 'bigint'
    })
    file_id: number;

    @Column({
        name: 'url',
        type: 'text',
        nullable: true
    })
    url: string;

    @Column({
        name: 'user_id',
        type: 'bigint'
    })
    user_id: number;

    @ManyToOne(() => User, u => u.user_id)
    @JoinColumn({ 
        name: 'user_id' 
    })
    userFile!: User;
}
