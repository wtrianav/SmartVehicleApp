import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from './modules/security/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if(Token) {
      console.log("Interceptado y con token: " + Token);
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${Token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          console.log("Ha ocurrido un error, usted no esta autorizado para ingresar a esta pagina.")
          this.router.navigateByUrl('/home');
        }
        return throwError(err);
      })
    )
  }
}
