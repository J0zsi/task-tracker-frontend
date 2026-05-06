import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { TuiChevron, TuiDataListWrapper, TuiInputChip, TuiMultiSelect } from '@taiga-ui/kit';
import { ErrorControl } from '../error-control/error-control';
import { TuiDataList, TuiSelectLike } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { Label } from '../label/label';
import { ControlItem, TextfieldSize, Value } from '../../../models';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-multi-select',
  imports: [
    Label,
    ErrorControl,
    FormsModule,
    TuiChevron,
    TuiDataListWrapper,
    TuiDataList,
    TuiInputChip,
    TuiMultiSelect,
    TuiSelectLike,
  ],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelect<T> implements FormValueControl<T[]> {
  value = model<T[]>([]);
  touched = model<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  items = input.required<ControlItem<T>[] | T[]>();
  label = input<string>('');
  requiredIndicator = input<boolean>(false);
  placeholder = input<string>('');
  textfieldCleaner = input<boolean>(true);
  textfieldSize = input<TextfieldSize>('m');

  protected readonly getItemLabel = (item: ControlItem<T> | T) => {
    if (item !== null && typeof item === 'object' && 'label' in item) {
      return item.label;
    }
    return String(item);
  };

  protected readonly getItemValue = (item: ControlItem<T> | T) => {
    if (item !== null && typeof item === 'object' && 'value' in item) {
      return item.value;
    }
    return String(item);
  };

  protected readonly stringify: TuiStringHandler<T> = (value) => {
    const foundItem = this.items().find((item) => this.getItemValue(item) === value);
    return foundItem ? this.getItemLabel(foundItem) : '';
  };
}
