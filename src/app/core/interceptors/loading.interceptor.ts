import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { delay, finalize } from 'rxjs';
import { SKIP_LOADING } from '../constants/http-context.constants';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }

  loadingService.startLoading();

  return next(req).pipe(
    //INFO: simulating real network request + preventing flickering
    delay(1000),
    finalize(() => loadingService.stopLoading()),
  );
};
