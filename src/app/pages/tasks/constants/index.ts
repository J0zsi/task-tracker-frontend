import { ControlItem } from '../../../shared/models';
import { SortType } from '../models';

export const VIEW_ITEMS: ControlItem<string>[] = [
  {
    label: 'List',
    value: 'list',
  },
  {
    label: 'Drag & Drop',
    value: 'drag-drop',
  },
];

export const SORT_ITEMS: ControlItem<SortType>[] = [
  {
    label: 'Status - ascending',
    value: 'status,asc',
  },
  {
    label: 'Status - descending',
    value: 'status,desc',
  },
  {
    label: 'Priority - ascending',
    value: 'priority,asc',
  },
  {
    label: 'Priority - descending',
    value: 'priority,desc',
  },
  {
    label: 'Title - ascending',
    value: 'title,asc',
  },
  {
    label: 'Title - descending',
    value: 'title,desc',
  },
  {
    label: 'Description - ascending',
    value: 'description,asc',
  },
  {
    label: 'Description - descending',
    value: 'description,desc',
  },
  {
    label: 'Due date - ascending',
    value: 'dueDate,asc',
  },
  {
    label: 'Due date - descending',
    value: 'dueDate,desc',
  },
  {
    label: 'Assignee - ascending',
    value: 'assignee,asc',
  },
  {
    label: 'Assignee - descending',
    value: 'assignee,desc',
  },
  {
    label: 'Tags - ascending',
    value: 'tags,asc',
  },
  {
    label: 'Tags - descending',
    value: 'tags,desc',
  },
  {
    label: 'Created at ascending',
    value: 'createdAt,asc',
  },
  {
    label: 'Created at - descending',
    value: 'createdAt,desc',
  },
  {
    label: 'Updated at - ascending',
    value: 'updatedAt,asc',
  },
  {
    label: 'Updated at - descending',
    value: 'updatedAt,desc',
  },
];
