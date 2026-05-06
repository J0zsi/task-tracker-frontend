import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserControllerService, UserDto } from '../../generated';
import { blobToJson } from '../utils/index.utils';
import { catchError, EMPTY } from 'rxjs';

export const usersResolver: ResolveFn<UserDto[]> = (route, state) => {
  const userService = inject(UserControllerService);

  return userService.list().pipe(
    blobToJson<UserDto[]>(),
    catchError((_) => EMPTY),
  );
};
