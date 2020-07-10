import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { getConnection, Connection } from 'typeorm';
import { Favorite } from './Favorite'
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Favorite, favorite => favorite.user)
    favorites: Promise<Favorite[]>
}
