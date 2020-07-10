import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { getConnection, Connection } from 'typeorm';
import { User } from "./User";
@Entity()
export class Favorite {

  //AUTO
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;

  //FK
  @Column({ nullable: true })
  userId: number

  //OBJ
  @ManyToOne(type => User, user => user.favorites)
  user: Promise<User>
}
