import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { ITaskStatus } from './task.model';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = ITaskStatus.OPEN;
    await task.save();
    return task;
  }

  async getTasks(filterTaskDto: FilterTaskDto) {
    const { q, status } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status ', { status });
    }
    if (q) {
      query.andWhere('task.title LIKE :q OR task.description LIKE :q ', {
        q: `%${q}%`,
      });
    }
    return await query.getMany();
  }
}
