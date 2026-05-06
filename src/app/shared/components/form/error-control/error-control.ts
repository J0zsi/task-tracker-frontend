import { Component, input } from '@angular/core';
import { ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { TuiError } from '@taiga-ui/core';

@Component({
  selector: 'app-error-control',
  imports: [TuiError],
  templateUrl: './error-control.html',
  styleUrl: './error-control.css',
})
export class ErrorControl {
  readonly touched = input.required<boolean>();
  readonly invalid = input.required<boolean>();
  readonly errors = input.required<readonly WithOptionalFieldTree<ValidationError>[]>();
  readonly onlyFirstError = input<boolean>(true);
}
