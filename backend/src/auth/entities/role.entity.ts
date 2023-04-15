import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'role_id'
    })
    role_id: number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'role_name',
    })
    role_name: string;

    @Column({
        type: 'text',
        name: 'role_description',
    })
    role_description: string;

    @OneToMany(() => User, a => a.userRole)
    obj_user_role: User[];
}
