import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
    ){}

    async getTaskById(id:string): Promise<Task>{
        const found = await this.taskRepository.findOne({where:{id:id}});

        if(!found){
            throw new NotFoundException(`Task Id "${id}" not found `);
        }

        return found;
    }
    
    async getAllTask(): Promise<Task[]>{
        const found = await this.taskRepository.find();

        if(!found){
            throw new NotFoundException(`No tasks found `);
        }

        return found;
    }

    async getTasks(filterDto:GetTaskFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    createTaskByDto(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById( id: string): Promise<void> {
       const result = await this.taskRepository.delete({id: id});
       console.log(result);

       if( result.affected === 0){
        throw new NotFoundException(`Task with ID "${id}" does not exist`);
       }
    }

    async updateTaskStatusById( id: string, status:TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        
        task.status = status;
        await this.taskRepository.save(task);

        return task;
    }

    // private tasks:Task[] = [];

    // getAllTasks():Task[] {
    //     return this.tasks;
    // }

    // createTask(title:string, description:string): Task {
    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    // createTaskByDto(createTaskDto:CreateTaskDto): Task {
    //     const {title,description} = createTaskDto;

    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    // getTaskById(id: string): Task | undefined {
    //     const found = this.tasks.find((task) => task.id === id );

    //     if(!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }

    //     return found;
    // }

    // deleteTaskById( id: string): void {
    //     this.tasks.splice(this.tasks.findIndex((task)=> task.id === id), 1);
    // }

    // updateTaskStatusById( id: string, status:TaskStatus): Task | undefined {
    //     const task = this.getTaskById(id);
    //     if( task != undefined ){
    //         task.status = status;
    //     }
    //     return task;
    // }

    // getTasksWithFilter( filterDto : GetTaskFilterDto): Task[]{
    //     const{ status, search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if( status) {
    //         tasks = tasks.filter((task) => task.status == status);
    //     }

    //     if( search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }else{
    //                 return false;
    //             }
    //         });
    //     }

    //     return tasks;
    // }
}
