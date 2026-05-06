import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskControls } from './task-controls';

describe('TaskControls', () => {
  let component: TaskControls;
  let fixture: ComponentFixture<TaskControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskControls],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
