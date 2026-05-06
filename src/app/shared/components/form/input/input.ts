import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { TuiInput } from '@taiga-ui/core';
import { ErrorControl } from '../error-control/error-control';
import { Label } from '../label/label';
import { TextfieldSize } from '../../../models';

@Component({
  selector: 'app-input',
  imports: [TuiInput, Label, ErrorControl],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements FormValueControl<string> {
  value = model('');
  touched = model<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  label = input<string>('');
  requiredIndicator = input<boolean>(false);
  placeholder = input<string>('');
  textfieldCleaner = input<boolean>(true);
  textfieldSize = input<TextfieldSize>('m');
}
