import { TaskDto } from "../../../generated";

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskDto.StatusEnum | null;
  priority: TaskDto.PriorityEnum | null;
  tags: number[];
  assignee: number | null;
  dueDate: string | null;
}
