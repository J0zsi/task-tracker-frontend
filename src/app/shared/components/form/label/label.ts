import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.css',
})
export class Label {
  label = input<string>('alma');
  requiredIndicator = input<boolean>(false);
}
