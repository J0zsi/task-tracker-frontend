import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { TaskControllerService, TaskDto } from '../../../../generated';
import { TUI_CONFIRM, TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { ROUTES } from '../../../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { HttpContext } from '@angular/common/http';
import {
  INTERCEPTOR_HANDLE_ERROR,
  MAX_RETRIES,
} from '../../../../core/constants/http-context.constants';
import { NotificationService } from '../../../../core/services/notification.service';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiCardLarge } from '@taiga-ui/layout';
import { LayoutMode } from '../../models';

@Component({
  selector: 'app-task-cards',
  imports: [RouterLink, TuiAvatar, TuiIcon, TuiSkeleton, TuiButton, TuiCardLarge, TuiIcon],
  templateUrl: './task-cards.html',
  styleUrl: './task-cards.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCards {
  private taskService = inject(TaskControllerService);
  private readonly notifications = inject(NotificationService);
  private readonly dialogs = inject(TuiResponsiveDialogService);

  protected readonly routes = ROUTES;

  readonly tasks = input.required<TaskDto[]>();
  readonly selectedLayoutMode = input.required<LayoutMode>();
  readonly tasksLoading = input.required<boolean>();

  protected readonly searchRequest = output();

  requestConfirmation(_: Event, taskId: number) {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Deletion confirmation',
        size: 's',
        data: {
          content: 'Are you sure? This action cannot be undone.',
          yes: 'Yes',
          no: 'No',
        },
      })
      .subscribe((accepted) => {
        if (accepted) {
          this.deleteTask(taskId);
        }
      });
  }

  deleteTask(taskId: number) {
    this.taskService
      .delete1(taskId, 'body', undefined, {
        context: new HttpContext().set(MAX_RETRIES, 2).set(INTERCEPTOR_HANDLE_ERROR, false),
      })
      .subscribe({
        next: () => {
          this.notifications.openSuccess('Task deleted.', {
            label: 'Success',
          });
          this.searchRequest.emit();
        },
        error: () => {
          this.notifications.openError('Task could not be deleted.', {
            label: 'Error',
          });
        },
      });
  }
}
