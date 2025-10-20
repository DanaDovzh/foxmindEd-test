import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HttpSuccessInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap(() => {
      if (req.method === 'GET') {
        snackBar.open('Дані успішно отримано ✅', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    })
  );
};
