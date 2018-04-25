import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AuthInterceptor } from './authorization.interceptor';

export const GD_AUTHORIZATION_PROVIDERS = [{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}];
