import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';

export const HttpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Сталася помилка';

      if (error.status === 0) {
        message = 'Сервер недоступний';
      } else if (error.status >= 400) {
        message = error.error?.message || `Помилка ${error.status}: ${error.statusText}`;
      }

      snackBar.open(message, 'Закрити', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

      return throwError(() => error);
    })
  );
};
