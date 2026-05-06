import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TuiButton, TuiHorizontalDirection, TuiIcon, TuiInput, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

@Component({
  selector: 'app-drawer',
  imports: [TuiButton, TuiDrawer, TuiInput, TuiPopup, TuiButton],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  readonly direction = input<TuiHorizontalDirection>('end');
  readonly overlay = input(true);
  readonly open = input(false);
  protected readonly closeRequested = output<void>();
}
