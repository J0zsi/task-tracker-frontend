import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TaskControllerService, TaskDto } from '../../generated';
import { INTERCEPTOR_HANDLE_ERROR, MAX_RETRIES } from '../../core/constants/http-context.constants';
import { HttpContext } from '@angular/common/http';
import { blobToJson } from '../utils/index.utils';
import { catchError, EMPTY, of } from 'rxjs';

export const taskResolver: ResolveFn<TaskDto | null> = (route, state) => {
  const taskService = inject(TaskControllerService);

  const taskIdParam = route.paramMap.get('id');
  if (taskIdParam === null) {
    return of(null);
  } else {
    const taskId = Number(taskIdParam);
    return taskService
      .get1(taskId, 'body', undefined, {
        context: new HttpContext().set(MAX_RETRIES, 2).set(INTERCEPTOR_HANDLE_ERROR, true),
      })
      .pipe(
        blobToJson<TaskDto>(),
        catchError((_) => EMPTY),
      );
  }
};
