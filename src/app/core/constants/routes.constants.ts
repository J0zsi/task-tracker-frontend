export const ROUTES = {
  TASKS: '/tasks',
  TASKS_NEW: '/tasks/new',
  TASKS_EDIT: (id: number) => `/tasks/${id}/edit`,
  TASKS_DETAIL: (id: number) => `/tasks/${id}`,
  ERROR: '/error',
} as const;
