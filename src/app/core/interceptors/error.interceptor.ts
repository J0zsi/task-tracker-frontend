import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { catchError, retry, throwError, timer } from 'rxjs';
import { INTERCEPTOR_HANDLE_ERROR, MAX_RETRIES } from '../constants/http-context.constants';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    retry({
      count: req.context.get(MAX_RETRIES),
      delay: (error: HttpErrorResponse, retryCount) => {
        return timer(1000 * retryCount);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      const maxRetries = req.context.get(MAX_RETRIES);
      const handleError = req.context.get(INTERCEPTOR_HANDLE_ERROR);

      if (handleError) {
        errorService.handleHttpError(error);
      }

      return throwError(() => error);
    }),
  );
};
