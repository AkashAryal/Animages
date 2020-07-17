import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { Favorite } from './Favorite'
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Favorite, favorite => favorite.user)
    favorites: Promise<Favorite[]>
}
