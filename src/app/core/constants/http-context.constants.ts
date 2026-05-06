import { HttpContextToken } from '@angular/common/http';

export const MAX_RETRIES = new HttpContextToken<number>(() => 0);

export const INTERCEPTOR_HANDLE_ERROR = new HttpContextToken<boolean>(() => true);

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);
