import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './google-auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: GoogleAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;
    if (url.indexOf(environment.APP_URL) > -1 || url.indexOf(environment.API_URL) > -1) {
      if (this.authService.isAuthenticated())
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getStoredIdToken()}`
          }
        });
    }
    return next.handle(request);
  }
}
