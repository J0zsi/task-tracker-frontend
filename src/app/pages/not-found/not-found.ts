import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ROUTES } from '../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TuiButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-auto',
  },
})
export class NotFound {
  protected readonly routes = ROUTES;
}
