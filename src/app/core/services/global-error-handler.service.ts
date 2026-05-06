import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  errorService = inject(ErrorService);

  handleError(error: any): void {
    this.errorService.handleGlobalError(error);
  }
}
