import { ResolveFn } from '@angular/router';
import { TagControllerService, TagDto } from '../../generated';
import { blobToJson } from '../utils/index.utils';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

export const tagsResolver: ResolveFn<TagDto[]> = (route, state) => {
  const tagService = inject(TagControllerService);

  return tagService.list2().pipe(
    blobToJson<TagDto[]>(),
    catchError((_) => EMPTY),
  );
};
