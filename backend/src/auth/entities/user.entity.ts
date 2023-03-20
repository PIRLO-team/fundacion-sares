import { BaseEntity } from '../../shared/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    user_id: number;

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
        type: 'varchar',
        length: 50,
        name: 'username',
        nullable: false
    })
    username: string;
    
    @Column({
        type: 'text',
        name: 'email',
        nullable: false
    })
    email: string;
    
    @Column({
        type: 'text',
        name: 'password',
        nullable: false
    })
    password: string;
    
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
        type: 'int',
        name: 'code',
        nullable: true
    })
    code: string;
    
    @Column({
        type: 'boolean',
        name: 'new_user',
        default: true,
        nullable: true
    })
    new_user: string;
    
    @Column({
        type: 'bigint',
        name: 'user_role',
        nullable: false
    })
    user_role: string;

    @ManyToOne(() => Role, r => r.role_id)
    @JoinColumn({
        name: 'user_role'
    })
    obj_user_role!: Role;
}
