import { Test } from '@nestjs/testing';
import { FilterTaskDto } from './dto/filter-task.dto';
import { ITaskStatus } from './task.model';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = {
  email: 'test@mailinator.com',
};

const expectedTasks = [
  {
    id: 12,
    title: 'eat food',
    description: 'todday',
    status: 'OPEN',
    userId: 'c625fead-0517-4f73-b51d-7d59ae092ea0',
  },
];

const mockTestRepository = () => ({
  getTasks: jest.fn(),
});

describe('TasksService', () => {
  let taskService;
  let taskRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTestRepository,
        },
      ],
    }).compile();

    taskService = module.get<TasksService>('TasksService');
    taskRepository = await module.get<TaskRepository>('TaskRepository');
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('getTasks', () => {
    it('get all tasks', async () => {
      taskRepository.getTasks.mockResolvedValue(expectedTasks);
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: FilterTaskDto = {
        status: ITaskStatus.IN_PROGRESS,
        q: 'hello',
      };
      const result = await taskService.getAllTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual(expectedTasks);
    });
  });
});
