import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './loading/loading.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();
    return next.handle(httpRequest).pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }
}
