import { Test } from "@nestjs/testing";
import { TaskRepository } from "./task.repository";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

const mockUser = {
    username: 'Brian',
    id: 'someId',
    password: 'somepassword',
    tasks: [],
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        // init NestJS module
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TaskRepository, useFactory: mockTasksRepository}
            ],

        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TaskRepository);
    });

    describe('getTaks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {

            tasksRepository.getTasks.mockResolvedValue('somevalue');
            const result = await tasksService.getTasks( {}, mockUser);
            expect(result).toEqual('somevalue');
        });
    })

    describe('getTaskById', () => {
        const mockTask = {
            title: 'mock title',
            description: '',
            id: '',
            status: TaskStatus.OPEN,
        }

        it('returns Task object by id', async () => {
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const task:Task = await tasksService.getTaskById( "1", mockUser);
            expect(task).toEqual(mockTask);
        });

        it('throws an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('1',mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});