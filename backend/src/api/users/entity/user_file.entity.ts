import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { BaseEntity } from '../../../shared/entity/base-entity';

@Entity('user_file')
export class UserFile extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'file_id'
    })
    file_id: number;

    @Column({
        type: 'text',
        name: 'url',
    })
    url: string;

    @Column({
        type: 'bigint',
        name: 'user_id',
    })
    user_id: number;


    @ManyToOne(() => User, u => u.user_id)
    @JoinColumn({
        name: 'user_id'
    })
    userFile!: User;
}
