import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { taskResolver } from './task-resolver';
import { TaskDto } from '../../generated';

describe('taskResolver', () => {
  const executeResolver: ResolveFn<TaskDto | null> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => taskResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
