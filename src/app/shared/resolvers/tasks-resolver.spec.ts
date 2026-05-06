import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tasksResolver } from './tasks-resolver';
import { PagedResponseTaskDto } from '../../generated';

describe('tasksResolver', () => {
  const executeResolver: ResolveFn<PagedResponseTaskDto> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tasksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
