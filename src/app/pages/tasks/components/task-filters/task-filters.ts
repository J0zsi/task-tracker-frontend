import { ChangeDetectionStrategy, Component, input, model, OnInit, output } from '@angular/core';
import { Select } from '../../../../shared/components/form/select/select';
import { MultiSelect } from '../../../../shared/components/form/multi-select/multi-select';
import { Input } from '../../../../shared/components/form/input/input';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TagDto, TaskDto, UserDto } from '../../../../generated';
import { SortType } from '../../models';
import { toControlItems } from '../../../../shared/mappers';
import { ControlItem } from '../../../../shared/models';
import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../../../shared/constants';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-task-filters',
  imports: [Input, MultiSelect, Select, TuiButton, TuiCardLarge, TuiIcon],
  templateUrl: './task-filters.html',
  styleUrl: './task-filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFilters implements OnInit {
  readonly titleAndDescriptionSearchTerm = model.required<string>();
  readonly selectedStatus = model.required<TaskDto.StatusEnum | null>();
  readonly selectedPriority = model.required<TaskDto.PriorityEnum | null>();
  readonly selectedTags = model.required<number[]>();
  readonly selectedAssignee = model.required<number | null>();
  readonly selectedSortOption = model.required<SortType | null>();

  readonly tasks = input.required<TaskDto[]>();
  readonly tags = input.required<TagDto[]>();
  readonly assignees = input.required<UserDto[]>();
  readonly tasksLoading = input.required<boolean>();

  protected readonly statusItems = STATUS_ITEMS;
  protected readonly priorityItems = PRIORITY_ITEMS;
  protected tagItems: ControlItem<number>[] = [];
  protected assigneeItems: ControlItem<number>[] = [];

  protected readonly searchRequest = output();

  ngOnInit() {
    this.tagItems = toControlItems(this.tags());
    this.assigneeItems = toControlItems(this.assignees());
  }

  clearFilters() {
    this.titleAndDescriptionSearchTerm.set('');
    this.selectedStatus.set(null);
    this.selectedPriority.set(null);
    this.selectedTags.set([]);
    this.selectedAssignee.set(null);
  }
}
