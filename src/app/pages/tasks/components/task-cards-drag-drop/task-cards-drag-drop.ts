import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { TaskControllerService, TaskDto } from '../../../../generated';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '../../../../core/constants/http-context.constants';
import { blobToJson } from '../../../../shared/utils/index.utils';
import { TuiSkeleton } from '@taiga-ui/kit';
import { LayoutMode, View } from '../../models';

@Component({
  selector: 'app-task-cards-drag-drop',
  imports: [TuiSkeleton, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './task-cards-drag-drop.html',
  styleUrl: './task-cards-drag-drop.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardsDragDrop {
  private taskService = inject(TaskControllerService);

  readonly tasks = input.required<TaskDto[]>();
  readonly selectedView = input.required<View>();
  readonly selectedLayoutMode = input.required<LayoutMode>();
  readonly tasksLoading = input.required<boolean>();

  protected readonly statusList = Object.values(TaskDto.StatusEnum);
  protected readonly tasksByStatus = linkedSignal(() => {
    const groupedTasksByStatus = Object.fromEntries(
      this.statusList.map((status) => [status, [] as TaskDto[]]),
    ) as Record<TaskDto.StatusEnum, TaskDto[]>;

    if (this.selectedView() === 'drag-drop') {
      this.tasks().forEach((task) => {
        groupedTasksByStatus[task.status as TaskDto.StatusEnum].push(task);
      });
    }
    return groupedTasksByStatus;
  });

  drop(event: CdkDragDrop<TaskDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newStatus = event.container.id as TaskDto.StatusEnum;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const taskId = event.item.data.id;
      this.taskService
        .updateStatus(taskId, { status: newStatus }, 'body', undefined, {
          context: new HttpContext().set(SKIP_LOADING, true),
        })
        .pipe(blobToJson())
        .subscribe({
          error: (_) => {
            transferArrayItem(
              event.container.data,
              event.previousContainer.data,
              event.currentIndex,
              event.previousIndex,
            );
            this.tasksByStatus.update((current) => ({ ...current }));
          },
        });
    }
  }
}
