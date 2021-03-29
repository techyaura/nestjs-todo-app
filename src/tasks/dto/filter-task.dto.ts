import { IsOptional } from 'class-validator';
import { ITaskStatus } from '../task.model';

export class FilterTaskDto {
  @IsOptional()
  status: ITaskStatus;

  @IsOptional()
  q: string;
}
