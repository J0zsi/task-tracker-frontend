import { TuiLoader, tuiLoaderOptionsProvider, TuiRoot } from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { filter, take } from 'rxjs';
import { TuiProgress } from '@taiga-ui/kit';
import { ROUTES } from './core/constants/routes.constants';
import { RootLayout } from './shared/components/layout/root-layout/root-layout';

@Component({
  selector: 'app-root',
  imports: [RootLayout, RouterOutlet, TuiLoader, TuiProgress, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly loadingService = inject(LoadingService);
  protected readonly title = signal('task-tracker-frontend');

  protected readonly isFirstNavigationLoading = signal(true);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
        take(1),
      )
      .subscribe((event) => {
        this.isFirstNavigationLoading.set(false);
        if (event instanceof NavigationError || event instanceof NavigationCancel) {
          this.router.navigateByUrl(ROUTES.ERROR);
        }
      });
  }
}
