import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PagedResponseTaskDto, TaskControllerService } from '../../generated';
import { blobToJson } from '../utils/index.utils';
import { catchError, EMPTY } from 'rxjs';

export const tasksResolver: ResolveFn<PagedResponseTaskDto> = (route, state) => {
  const taskService = inject(TaskControllerService);

  return taskService.list1({ size: 5 }).pipe(
    blobToJson<PagedResponseTaskDto>(),
    catchError((_) => EMPTY),
  );
};
