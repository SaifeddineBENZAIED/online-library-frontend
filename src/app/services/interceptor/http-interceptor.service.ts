import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoaderService } from 'src/app/composants/loader/service/loader.service';
import { AuthenticationResponse } from 'src/app/dto/authentication-response';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  authenticationResponse: AuthenticationResponse = {};

  constructor(
    private loaderService: LoaderService,
    private authService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    if (
      (req.method === 'POST' || req.method === 'PUT') &&
      (req.url.endsWith('http://localhost:3000/auth/register') ||
        req.url.endsWith('http://localhost:3000/auth/register-client'))
    ) {
      return this.handleRequest(req, next);
    }
    
    const connectedPerson = this.authService.getConnectedPerson();
    if (connectedPerson) {
      /*const accessToken = connectedPerson.accessToken;
      this.authenticationResponse.accessToken = accessToken;*/
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + connectedPerson.accessToken
        })
      });
      /*const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authenticationResponse.accessToken}`)
      });*/
      
      return this.handleRequest(authReq, next);
    } else {
      console.log("No connectedPerson data found in local storage.");
    }
    return this.handleRequest(req, next);
    /*if (localStorage.getItem('access_token')) {
      authenticationResponse = JSON.parse(
        localStorage.getItem('access_token') as string
      );
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse.access_token
        })
      });
      console.log(authReq);
      console.log("---------------------------------------------------");
      console.log(next);
      return this.handleRequest(authReq, next);
    }
    return this.handleRequest(req, next);*/
  }

  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.loaderService.hide();
          }
        },
        error: (err: any) => {
          this.loaderService.hide();
        }
      })
    );
  }
}
