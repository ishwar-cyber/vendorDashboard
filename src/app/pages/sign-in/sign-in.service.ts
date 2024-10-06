import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  loginUrl = "http://localhost:8080/user/login";


  constructor(private httpClient: HttpClient) {
  }

  login(body:any): Observable<any> {
    return this.httpClient.post<any>(this.loginUrl,body);
  }

}
