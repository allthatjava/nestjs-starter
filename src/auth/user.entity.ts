import { Task } from "../tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({unique:true})  // retrict to have unique value in the database
    username: string;
    @Column()
    password: string;

    @OneToMany(_type=> Task, task => task.user, {eager:true})
    tasks: Task[];

}