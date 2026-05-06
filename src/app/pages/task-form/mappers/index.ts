import { TaskDto, TaskRequest } from '../../../generated';
import { TaskFormData } from '../models';

export const toTaskFormData = (taskDto: TaskDto): TaskFormData => {
  return {
    title: taskDto.title ?? '',
    description: taskDto.description ?? '',
    priority: taskDto.priority ?? null,
    status: taskDto.status ?? null,
    dueDate: taskDto.dueDate ?? null,
    assignee: taskDto.assignee?.id ?? null,
    tags: taskDto.tags?.flatMap(({ id }) => (id !== null && id !== undefined ? [id] : [])) ?? [],
  };
};

export const toTaskRequest = (taskFormData: TaskFormData): TaskRequest => {
  return {
    title: taskFormData.title,
    description: taskFormData.description,
    status: taskFormData.status ?? undefined,
    priority: taskFormData.priority ?? undefined,
    assigneeId: taskFormData.assignee ?? undefined,
    tagIds: taskFormData.tags ?? undefined,
    dueDate: taskFormData.dueDate ?? undefined,
  };
};
