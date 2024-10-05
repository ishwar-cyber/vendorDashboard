import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token')
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(reqWithHeader).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(reqWithHeader.url, event.body, event.status);
    }
  }));
  
}
