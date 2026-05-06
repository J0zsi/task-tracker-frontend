import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { ErrorControl } from '../error-control/error-control';
import { TuiTextarea } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { Label } from '../label/label';
import { TextfieldSize } from '../../../models';

@Component({
  selector: 'app-textarea',
  imports: [ErrorControl, FormsModule, Label, TuiTextarea],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea implements FormValueControl<string> {
  value = model('');
  touched = model<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  label = input<string>('');
  requiredIndicator = input<boolean>(false);
  placeholder = input<string>('');
  rows = input(3);
  textfieldCleaner = input<boolean>(true);
  textfieldSize = input<TextfieldSize>('m');
}
