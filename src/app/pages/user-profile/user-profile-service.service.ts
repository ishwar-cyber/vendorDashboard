import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  fetchMasterServicesUrl = "http://localhost:8081/service";
  fetchUserDetailsByIdUrl = "http://localhost:8081/vendor";
  updateVendorDetailsByIdUrl = "http://localhost:8081/vendor"

  constructor(private httpClient: HttpClient) {
  }

  fetchMasterServices(): Observable<any> {
    return this.httpClient.get<any>(this.fetchMasterServicesUrl);
  }

  fetchUserDetailsById(id: String): Observable<any> {
    return this.httpClient.get<any>(this.fetchUserDetailsByIdUrl + "/" + id);
  }


  updateVendorDetailsById(id:String,body:any):Observable<any>{
    return this.httpClient.put<any>(this.fetchUserDetailsByIdUrl + "/" + id,body);
  }


}
