import { TaskDto } from '../../generated';
import { ControlItem } from '../models';

export const STATUS_ITEMS: ControlItem<TaskDto.StatusEnum>[] = [
  { label: 'Todo', value: TaskDto.StatusEnum.Todo },
  { label: 'In Progress', value: TaskDto.StatusEnum.InProgress },
  { label: 'In Review', value: TaskDto.StatusEnum.InReview },
  { label: 'Done', value: TaskDto.StatusEnum.Done },
];

export const PRIORITY_ITEMS: ControlItem<TaskDto.PriorityEnum>[] = [
  { label: 'Low', value: TaskDto.PriorityEnum.Low },
  { label: 'Medium', value: TaskDto.PriorityEnum.Medium },
  { label: 'High', value: TaskDto.PriorityEnum.High },
  { label: 'Urgent', value: TaskDto.PriorityEnum.Urgent },
];
