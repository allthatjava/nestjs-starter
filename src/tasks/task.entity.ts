import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
    // @PrimaryGeneratedColumn() // Numeric sequenc
    @PrimaryGeneratedColumn('uuid') // generate uuid based id
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

}