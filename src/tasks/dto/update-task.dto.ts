import { IsNotEmpty, IsOptional } from 'class-validator';
import { ITaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  status: ITaskStatus;
}
