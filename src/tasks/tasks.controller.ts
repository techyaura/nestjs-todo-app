import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { JwtAuthUser } from 'src/auth/auth-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  private logger = new Logger('Tasks Controller');
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @Req() req,
  ): Promise<Task[]> {
    this.logger.verbose(
      `${req.user.email}  is fetching tasks with ${JSON.stringify(
        filterTaskDto,
      )}`,
    );
    return this.tasksService.getAllTasks(filterTaskDto, req.user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, req.user);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, req.user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ): Promise<string> {
    return this.tasksService.deleteTaskById(id, req.user);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createTask(@Req() req, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(req.user);
    return this.tasksService.createTask(createTaskDto, req.user);
  }
}
