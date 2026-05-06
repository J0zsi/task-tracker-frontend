import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TagDto, TaskControllerService, TaskDto, TaskRequest, UserDto } from '../../generated';
import { debounce, form, FormField, maxLength, required, submit } from '@angular/forms/signals';
import { blobToJson } from '../../shared/utils/index.utils';
import { TuiCardLarge } from '@taiga-ui/layout';
import { Input } from '../../shared/components/form/input/input';
import { ControlItem } from '../../shared/models';
import { Select } from '../../shared/components/form/select/select';
import { MultiSelect } from '../../shared/components/form/multi-select/multi-select';
import DatePicker from '../../shared/components/form/date-picker/date-picker';
import { Textarea } from '../../shared/components/form/textarea/textarea';
import { TuiButton } from '@taiga-ui/core';
import { TaskFormData } from './models';
import { ROUTES } from '../../core/constants/routes.constants';
import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants';
import { toTaskFormData, toTaskRequest } from './mappers';
import { toControlItems } from '../../shared/mappers';

@Component({
  selector: 'app-task',
  imports: [
    DatePicker,
    FormField,
    Input,
    RouterLink,
    MultiSelect,
    Select,
    Textarea,
    TuiButton,
    TuiCardLarge,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskControllerService);

  private readonly taskId = this.route.snapshot.paramMap.get('id');

  protected readonly task = input.required<TaskDto | null>();
  protected readonly tags = input.required<TagDto[]>();
  protected readonly assignees = input.required<UserDto[]>();

  protected readonly routes = ROUTES;

  protected readonly statusItems = STATUS_ITEMS;
  protected readonly priorityItems = PRIORITY_ITEMS;
  protected tagItems: ControlItem<number>[] = [];
  protected assigneeItems: ControlItem<number>[] = [];

  protected readonly isNewTask = this.taskId === null;

  protected readonly loading = signal(false);

  protected readonly taskFormModel = signal<TaskFormData>({
    title: '',
    description: '',
    status: null,
    priority: null,
    tags: [],
    assignee: null,
    dueDate: null,
  });

  protected readonly taskForm = form(this.taskFormModel, (fieldPath) => {
    debounce(fieldPath.title, 200);
    required(fieldPath.title, { message: 'This field is required' });
    maxLength(fieldPath.title, 200, { message: 'Maximum 200 characters allowed' });
  });

  ngOnInit() {
    this.tagItems = toControlItems(this.tags());
    this.assigneeItems = toControlItems(this.assignees());

    console.log(this.isNewTask);

    if (this.isNewTask) {
      return;
    }

    const task = this.task();
    if (!task) {
      return;
    }

    this.taskFormModel.set(toTaskFormData(task));
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.taskForm, async () => {
      this.loading.set(true);

      const taskRequest: TaskRequest = toTaskRequest(this.taskFormModel());

      let request$ = this.taskService.create1(taskRequest);
      if (this.taskId) {
        request$ = this.taskService.update1(Number(this.taskId), taskRequest);
      }

      request$.pipe(blobToJson<TaskDto>()).subscribe((res) => {
        this.router.navigate([ROUTES.TASKS]).finally(() => {
          this.loading.set(false);
        });
      });
    });
  }
}
