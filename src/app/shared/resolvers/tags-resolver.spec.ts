import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tagsResolver } from './tags-resolver';
import { TagDto } from '../../generated';

describe('tagsResolver', () => {
  const executeResolver: ResolveFn<TagDto[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tagsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
