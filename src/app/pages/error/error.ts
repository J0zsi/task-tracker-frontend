import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTES } from '../../core/constants/routes.constants';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-error',
  imports: [RouterLink, TuiButton],
  templateUrl: './error.html',
  styleUrl: './error.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error {
  protected readonly routes = ROUTES;
}
