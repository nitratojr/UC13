import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Dish } from "./Dish";

@Entity('favorite_dishes')
export class FavoriteDish {

  @PrimaryGeneratedColumn()
  id!: number;
                                                                                                                                                                                                                                                     

  @ManyToOne(() => User, (user) => user.favoriteDishes)
  user!: User;

  @ManyToOne(() => Dish, (dish) => dish.favoriteDishes)
  dish!: Dish;

}