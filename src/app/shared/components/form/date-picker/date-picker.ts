import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { TuiDay } from '@taiga-ui/cdk';
import { tuiDateFormatProvider } from '@taiga-ui/core';
import { TuiInputDate, tuiInputDateOptionsProvider } from '@taiga-ui/kit';
import { ErrorControl } from '../error-control/error-control';
import { Label } from '../label/label';
import { TextfieldSize } from '../../../models';


@Component({
  selector: 'app-date-picker',
  imports: [FormsModule, TuiInputDate, Label, ErrorControl],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiDateFormatProvider({ mode: 'yyyy/mm/dd', separator: '.' }),
    tuiInputDateOptionsProvider({
      valueTransformer: {
        fromControlValue: (value: string | null): TuiDay | null => {
          if (!value) return null;

          const [year, month, day] = value.split('-').map(Number);
          return new TuiDay(year, month - 1, day);
        },
        toControlValue: (value: TuiDay | null): string | null => {
          if (!value) return null;

          const y = value.year;
          const m = String(value.month + 1).padStart(2, '0');
          const d = String(value.day).padStart(2, '0');
          return `${y}-${m}-${d}`;
        },
      },
    }),
  ],
})
export default class DatePicker implements FormValueControl<string | null> {
  value = model<string | null>(null);
  touched = model<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  label = input<string>('');
  requiredIndicator = input<boolean>(false);
  placeholder = input<string>('');
  textfieldCleaner = input<boolean>(true);
  textfieldSize = input<TextfieldSize>('m');
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  minDateToday = input<boolean>(false);

  formattedMinDate = computed(() => {
    const minDate = this.minDate();
    if (this.minDateToday()) {
      return TuiDay.currentLocal();
    } else if (minDate) {
      return TuiDay.fromUtcNativeDate(minDate);
    }
    return null;
  });
  formattedMaxDate = computed(() => {
    const maxDate = this.maxDate();
    if (maxDate) {
      return TuiDay.fromUtcNativeDate(maxDate);
    }
    return null;
  });
}
