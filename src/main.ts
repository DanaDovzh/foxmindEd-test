import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { HttpErrorInterceptor } from './app/core/http-error-interceptor';
import { getUkrPaginatorIntl } from './app/shared/custom-paginator-intl';
import { HttpSuccessInterceptor } from './app/core/http-success.interceptor';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([
        HttpErrorInterceptor,
        HttpSuccessInterceptor,
      ])
    ),
    provideRouter(routes),
    { provide: MatPaginatorIntl, useValue: getUkrPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'uk' }
  ]
}).catch(err => console.error(err));

registerLocaleData(localeUk);
