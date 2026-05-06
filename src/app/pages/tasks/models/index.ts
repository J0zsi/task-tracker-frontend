import { ControlItem } from '../../../shared/models';

export type LayoutMode = 'row' | 'column'

export type View = 'list' | 'drag-drop';

export type SortType =
  | 'status,asc'
  | 'status,desc'
  | 'priority,asc'
  | 'priority,desc'
  | 'title,asc'
  | 'title,desc'
  | 'description,asc'
  | 'description,desc'
  | 'dueDate,asc'
  | 'dueDate,desc'
  | 'createdAt,asc'
  | 'createdAt,desc'
  | 'updatedAt,asc'
  | 'updatedAt,desc'
  | 'tags,asc'
  | 'tags,desc'
  | 'assignee,asc'
  | 'assignee,desc';
