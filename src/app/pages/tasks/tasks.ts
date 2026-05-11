import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  model,
  signal,
} from '@angular/core';
import {
  PagedResponseTaskDto,
  TagDto,
  TaskControllerService,
  TaskDto,
  UserDto,
} from '../../generated';
import { finalize, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { blobToJson } from '../../shared/utils/index.utils';
import { Pagination } from '../../shared/components/navigation/pagination/pagination';
import { PaginationState } from '../../shared/components/navigation/pagination/models';
import { ROUTES } from '../../core/constants/routes.constants';
import { LayoutMode, SortType, View } from './models';
import { TaskCards } from './components/task-cards/task-cards';
import { TaskCardsDragDrop } from './components/task-cards-drag-drop/task-cards-drag-drop';
import { TaskFilters } from './components/task-filters/task-filters';
import { TaskControls } from './components/task-controls/task-controls';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Pagination, FormsModule, TaskCards, TaskCardsDragDrop, TaskFilters, TaskControls],
})
export class Tasks {
  private taskService = inject(TaskControllerService);

  protected readonly routes = ROUTES;

  protected tags = input.required<TagDto[]>();
  protected assignees = input.required<UserDto[]>();

  protected readonly pagedResponseTask = model.required<PagedResponseTaskDto>();
  protected readonly tasks = linkedSignal(() => this.pagedResponseTask()?.content ?? []);

  protected readonly page = linkedSignal<PagedResponseTaskDto, number>({
    source: this.pagedResponseTask,
    computation: (pagedResponseTask, previous): number => {
      if (this.selectedView() === 'list') {
        return pagedResponseTask.page ?? 0;
      }
      return previous?.value ?? 0;
    },
  });
  protected readonly pageSize = linkedSignal<PagedResponseTaskDto, number>({
    source: this.pagedResponseTask,
    computation: (pagedResponseTask, previous) => {
      if (this.selectedView() === 'list') {
        return pagedResponseTask.size ?? 10;
      }
      return previous?.value ?? 10;
    },
  });
  protected readonly totalElements = linkedSignal(() => this.pagedResponseTask().totalElements);

  protected readonly titleAndDescriptionSearchTerm = signal<string>('');
  protected readonly selectedStatus = signal<TaskDto.StatusEnum | null>(null);
  protected readonly selectedPriority = signal<TaskDto.PriorityEnum | null>(null);
  protected readonly selectedTags = signal<number[]>([]);
  protected readonly selectedAssignee = signal<number | null>(null);
  protected readonly selectedSortOption = signal<SortType | null>(null);

  protected readonly selectedView = signal<View>('list');
  protected readonly selectedLayoutMode = signal<LayoutMode>('column');
  protected readonly tasksLoading = signal(false);

  search() {
    const titleAndDescriptionSearchTerm = this.titleAndDescriptionSearchTerm() ?? undefined;
    const selectedStatus = this.selectedStatus() ?? undefined;
    const selectedPriority = this.selectedPriority() ?? undefined;
    const selectedTagIds = this.selectedTags();
    const selectedAssigneeId = this.selectedAssignee() ?? undefined;
    const selectedSortOption = this.selectedSortOption();
    const sort = selectedSortOption ? [selectedSortOption] : undefined;
    let page: number | undefined;
    let size: number | undefined;

    if (this.selectedView() === 'list') {
      page = this.page();
      size = this.pageSize();
    }

    this.tasksLoading.set(true);
    this.taskService
      .list1(
        { sort, page, size },
        selectedStatus,
        selectedPriority,
        selectedAssigneeId,
        selectedTagIds,
        titleAndDescriptionSearchTerm,
      )
      .pipe(
        blobToJson<PagedResponseTaskDto>(),
        finalize(() => this.tasksLoading.set(false)),
      )
      .subscribe((jsonResponse) => {
        this.pagedResponseTask.set(jsonResponse);
      });
  }

  onPageChange(event: PaginationState) {
    this.page.set(event.currentPage);
    this.pageSize.set(event.pageSize);
    this.search();
    setTimeout(() => window.scrollTo(0, 0));
  }
}
