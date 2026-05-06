import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { LayoutMode, SortType, View } from '../../models';
import { TuiSegmented } from '@taiga-ui/kit';
import { SORT_ITEMS, VIEW_ITEMS } from '../../constants';
import { ROUTES } from '../../../../core/constants/routes.constants';
import { FormsModule } from '@angular/forms';
import { Select } from '../../../../shared/components/form/select/select';

@Component({
  selector: 'app-task-controls',
  imports: [FormsModule, RouterLink, Select, TuiButton, TuiIcon, TuiSegmented],
  templateUrl: './task-controls.html',
  styleUrl: './task-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskControls {
  protected readonly routes = ROUTES;

  readonly selectedView = model.required<View>();
  readonly selectedLayoutMode = model.required<LayoutMode>();
  readonly selectedSortOption = model.required<SortType | null>();

  readonly totalElements = input.required<number | undefined>();

  protected readonly searchRequest = output();

  protected readonly viewOptions = VIEW_ITEMS;
  protected readonly sortItems = SORT_ITEMS;
}
