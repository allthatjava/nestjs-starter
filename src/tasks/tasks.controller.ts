import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.taskService.createTaskByDto(createTaskDto);
    }
    
    @Delete('/:id')
    deleteTask(@Param('id') id: string ): Promise<void> {
        return this.taskService.deleteTaskById(id);
    }
    
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {

        // if(Object.keys(filterDto).length){
        //     console.log("Searching...");
        //     // return this.taskService.getTasksWithFilter(filterDto);
        //     return []};
        // }else{
            // return this.taskService.getAllTask();
        // }
        return this.taskService.getTasks(filterDto);
    }
    
    @Patch('/:id/status')
    updateTaskStatusById(@Param('id') id:string, @Body() updateTaskStatusDto: UpdateTaskStatusDto ): Promise<Task>{
        const {status} = updateTaskStatusDto;
        return this.taskService.updateTaskStatusById(id, status);
    }

    // @Get()
    // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

    //     if(Object.keys(filterDto).length){
    //         console.log("Searching...");
    //         return this.taskService.getTasksWithFilter(filterDto);
    //     }else{
    //         return this.taskService.getAllTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id:string ): Task | undefined {
    //     return this.taskService.getTaskById(id);
    // }

    // // @Post()
    // // createTask(@Body() body) {
    // //     console.log('body', body);
    // // }

    // // Sample for paramebter straight from Body()
    // // @Post()
    // // createTask(@Body('title') title:string,
    // //             @Body('description') description:string, ): Task {
    // //     console.log('title', title);
    // //     console.log('description', description);

    // //     return this.taskService.createTask(title, description);
    // // }
    
    // // Sample fro parameter using DTO
    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto ): Task {
    //     return this.taskService.createTaskByDto(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string ): void {
    //     this.taskService.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatusById(@Param('id') id:string, @Body() updateTaskStatusDto: UpdateTaskStatusDto ): Task|undefined{
    //     const {status} = updateTaskStatusDto;
    //     return this.taskService.updateTaskStatusById(id, status);
    // }
}
