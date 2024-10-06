import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOnboardServiceService {

  vendorOnBoardingUrl = "http://localhost:8080/user/signUp";


  constructor(private httpClient: HttpClient) {

  }


  fetchMasterServicesUrl = "http://localhost:8081/service";

  fetchMasterServices(): Observable<any> {
    return this.httpClient.get<any>(this.fetchMasterServicesUrl);
  }

  onboardVendor(body: any): Observable<any> {

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    console.log('Body is ', body);
    return this.httpClient.post<any>(this.vendorOnBoardingUrl, body, { headers: headers });
  }


}
