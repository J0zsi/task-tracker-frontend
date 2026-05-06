import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskDto } from '../../generated';
import { DatePipe } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAvatar, TuiBadge } from '@taiga-ui/kit';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-task-detail',
  imports: [DatePipe, TuiAvatar, RouterLink, TuiButton, TuiCardLarge, TuiBadge],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetail {
  protected readonly task = input.required<TaskDto | null>();
  protected readonly routes = ROUTES;
}
