import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ITaskStatus } from '../task.model';

export class TaskValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ITaskStatus.OPEN,
    ITaskStatus.DONE,
    ITaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    value = value.toUppercase();
    if (this.isStatusValid(value)) {
      return value;
    }
    throw new BadRequestException(`${status} is an invalid value`);
  }

  private isStatusValid(status: ITaskStatus) {
    return this.allowedStatuses.indexOf(status) !== -1;
  }
}
