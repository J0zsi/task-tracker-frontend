import { Routes } from '@angular/router';
import { taskResolver } from './shared/resolvers/task-resolver';
import { tagsResolver } from './shared/resolvers/tags-resolver';
import { usersResolver } from './shared/resolvers/users-resolver';
import { tasksResolver } from './shared/resolvers/tasks-resolver';

export const routes: Routes = [
  {
    path: 'tasks',
    resolve: {
      tags: tagsResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks),
        resolve: {
          pagedResponseTask: tasksResolver,
          assignees: usersResolver,
        },
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/task-form/task-form').then((m) => m.TaskForm),
        resolve: {
          assignees: usersResolver,
        },
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/task-form/task-form').then((m) => m.TaskForm),
        resolve: {
          task: taskResolver,
          assignees: usersResolver,
        },
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/task-detail/task-detail').then((m) => m.TaskDetail),
        resolve: {
          task: taskResolver,
        },
      },
    ],
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error/error').then((m) => m.Error),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
