import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly notifications = inject(NotificationService);

  handleHttpError(error: HttpErrorResponse): void {
    const msg = this.getHttpMessage(error);
    this.notifications.openError(msg, { label: 'Error' });
  }

  handleGlobalError(error: any): void {
    console.error('Global Error:', error);
  }

  private getHttpMessage(error: HttpErrorResponse): string {
    const { status } = error;
    if (status === 0) {
      return 'Network error. Please check your connection.';
    } else if (status >= 500) {
      return 'Something went wrong. Please try again later.';
    } else if (status >= 400) {
      return 'There was a problem with your request. Please check and try again.';
    }

    return 'An unexpected error occurred. Please try again later.';
  }
}
