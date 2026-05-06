import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardsDragDrop } from './task-cards-drag-drop';

describe('TaskCardsDragDrop', () => {
  let component: TaskCardsDragDrop;
  let fixture: ComponentFixture<TaskCardsDragDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardsDragDrop],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardsDragDrop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
