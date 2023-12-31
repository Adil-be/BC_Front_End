import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

/** Pass untouched request with the added token */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorage.getToken();
    if (token) {
      const secureReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(secureReq);
    } else {
      return next.handle(req);
    }
  }
}
