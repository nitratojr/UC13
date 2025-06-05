import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuarios') // nome da tabela
export class User {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar",length: 100,nullable:false})
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({type: "varchar",length:255})
    password: string;

    constructor (name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        }
        
}