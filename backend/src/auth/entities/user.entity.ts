import { BaseEntity } from '../../shared/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserFile } from '../../api/users/entity/user_file.entity';

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
        type: 'bigint',
        name: 'phone',
        nullable: true
    })
    phone: number;

    @Column({
        type: 'int',
        name: 'code',
        nullable: true
    })
    code: number;

    @Column({
        type: 'boolean',
        name: 'new_user',
        default: true,
        nullable: true
    })
    new_user: boolean;

    @Column({
        type: 'text',
        name: 'img_profile',
        nullable: true
    })
    img_profile: string;

    @Column({
        type: 'bigint',
        name: 'user_role',
        nullable: false
    })
    user_role: number;

    @Column({
        type: 'bigint',
        name: 'file',
        nullable: false
    })
    file: number;

    @ManyToOne(() => Role, r => r.role_id)
    @JoinColumn({
        name: 'user_role'
    })
    userRole!: Role;


    @OneToMany(() => UserFile, a => a.userFile)
    obj_user_file: UserFile[];
}
