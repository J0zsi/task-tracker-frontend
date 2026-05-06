import { provideTaiga, tuiNotificationOptionsProvider } from '@taiga-ui/core';
import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    tuiNotificationOptionsProvider({
      inline: 'center',
      autoClose: 4000,
      size: 'l',
    }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideTaiga(),
    provideTaiga(),
  ],
};
