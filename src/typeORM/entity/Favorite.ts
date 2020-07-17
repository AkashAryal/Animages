import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { User } from "./User";
@Entity()
export class Favorite {

  //AUTO
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column("longtext")
  imgUrl: string;

  //FK
  @Column({ nullable: true })
  userId: number

  //OBJ
  @ManyToOne(type => User, user => user.favorites)
  user: Promise<User>
}
