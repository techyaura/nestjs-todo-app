import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import * as config from 'config';
const taskMessages = config.get('messages.task');

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterTaskDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!task) {
      throw new NotFoundException(taskMessages.NOT_FOUND.replace('{ID}', id));
    }
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<string> {
    const found = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    if (found.affected === 0) {
      throw new NotFoundException(taskMessages.NOT_FOUND.replace('{ID}', id));
    }
    return `Task with ${id} has been deleted`;
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const task = await this.getTaskById(id, user);
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }
    task.save();
    return task;
  }
}
