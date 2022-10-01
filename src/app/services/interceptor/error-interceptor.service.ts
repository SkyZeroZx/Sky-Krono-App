import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled = false;
    return next.handle(req).pipe(
      retry(1),
      catchError((returnedError) => {
        let errorMessage = null;
        if (returnedError.error instanceof ErrorEvent) {
          errorMessage = `Error: ${returnedError.error}`;
        } else if (returnedError instanceof HttpErrorResponse) {
          errorMessage = `Error Status ${returnedError.status}: ${returnedError.statusText} - ${returnedError.error}`;
          handled = this.handleServerSideError(returnedError);
        }
        console.error(errorMessage ? errorMessage : returnedError);
        if (returnedError.error.title || returnedError.error.type) {
          this.toastr.error('Error desconocido');
        } else {
          this.toastr.error(
            `${
              returnedError.error.message || returnedError.error || 'Error desconocido'
            }`,
          );
        }
        if (!handled) {
          if (errorMessage) {
            return throwError(() => new Error(errorMessage));
          } else {
            return throwError(() => new Error('Unexpected problem occurred'));
          }
        } else {
          return of(returnedError);
        }
      }),
    );
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled = false;
    if (error.status == 401) {
      this.authService.logout();
      this.router.navigateByUrl('/login');
      handled = true;
    }
    return handled;
  }
}
