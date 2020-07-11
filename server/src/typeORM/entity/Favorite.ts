import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Favorite {

  //AUTO
  @PrimaryGeneratedColumn()
  id: number;

  @Column("longtext")
  imgUrl: string;

  //FK
  @Column({ nullable: true })
  userId: number

  //OBJ
  @ManyToOne(type => User, user => user.favorites)
  user: Promise<User>
}
