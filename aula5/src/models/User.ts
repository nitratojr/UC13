import { Entity, PrimaryGeneratedColumn, Column, OneToMany,  JoinTable } from "typeorm";
import { Order } from "./Order";
import { Dish } from "./Dish";
import { FavoriteDish } from "./FavaritDish";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  private _name: string;

  @Column({ unique: true })
  private _email: string;

  @Column({ nullable: false })
  private _password: string;

  @Column({ default: "customer" })
  private _role: string;

  @Column({type:'varchar',unique:true,length:15})
     private _phone: string;
  

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => FavoriteDish, (favoriteDish) => favoriteDish.user)
  favoriteDishes!: FavoriteDish[];

    /**

    /**
     * Getter $email
     * @return {string}
     */
	public get email(): string {
		return this.email;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this.email = value;
	}
    
	public get name(): string {
		return this.name;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set name(value: string) {
		this.name = value;
	}

    /**
     * Getter $password
     * @return {string}
     */
	public get password(): string {
		return this.password;
	}

    /**
     * Setter $password
     * @param {string} value
     */
	public set password(value: string) {
		this.password = value;
	}
  

    /**
     * Getter $role
     * @return {string}
     */
	public get role(): string {
		return this.role;
	}

    /**
     * Setter $role
     * @param {string} value
     */
	public set role(value: string) {
		this.role = value;
	}


    /**
     * Getter phone
     * @return {string}
     */
	public get phone(): string {
		return this._phone;
	}

    /**
     * Setter phone
     * @param {string} value
     */
	public set phone(value: string) {
		this._phone = value;
	}


	constructor(name:string,email:string,password:string,role:string,phone:string) {
        this._name = name;
        this._email= email;
        this._password = password;
        this._role = role;
        this._phone = phone;
	}
}



  
  

