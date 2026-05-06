import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root-layout',
  imports: [],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootLayout {}
