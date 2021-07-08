import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

export enum UserStatus {
    active = 'active',
    inactive = 'inactive',
}

@Entity({ name: 'users' })
class UserEntity {
    @Exclude()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    status: string;
}

export { UserEntity };
