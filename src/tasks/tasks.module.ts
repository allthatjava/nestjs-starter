import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TaskRepository,
      useFactory: (dataSource: DataSource)=>{
        return new TaskRepository(dataSource);
      },
      inject: [DataSource],
    }
  ],
  exports: [TaskRepository]
})
export class TasksModule {}
