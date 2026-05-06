import { inject, Injectable } from '@angular/core';
import { TuiNotificationOptions, TuiNotificationService } from '@taiga-ui/core';
import { finalize } from 'rxjs';

type NotificationOptions = Omit<Partial<TuiNotificationOptions<any>>, 'appearance'>;

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifications = inject(TuiNotificationService);
  private activeMessages = new Set<string>();

  openError(message: string, options?: NotificationOptions) {
    this.open(message, {
      ...options,
      appearance: 'negative',
    });
  }

  openSuccess(message: string, options?: NotificationOptions) {
    this.open(message, {
      ...options,
      appearance: 'positive',
    });
  }

  openInfo(message: string, options?: NotificationOptions) {
    this.open(message, {
      ...options,
      appearance: 'info',
    });
  }

  openWarning(message: string, options?: NotificationOptions) {
    this.open(message, {
      ...options,
      appearance: 'warning',
    });
  }

  open(message: string, options?: Partial<TuiNotificationOptions<any>>) {
    const activeMessage = options?.appearance + message + options?.label;
    if (this.activeMessages.has(activeMessage)) return;

    this.activeMessages.add(activeMessage);

    this.notifications
      .open(message, {
        ...options,
      })
      .pipe(
        finalize(() => {
          this.activeMessages.delete(activeMessage);
        }),
      )
      .subscribe();
  }
}
