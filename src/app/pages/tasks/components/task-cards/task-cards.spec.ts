import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCards } from './task-cards';

describe('TaskCards', () => {
  let component: TaskCards;
  let fixture: ComponentFixture<TaskCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCards],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
