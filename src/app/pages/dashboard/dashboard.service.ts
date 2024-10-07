import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient : HttpClient) { }

  getVendorBookingsURL = "http://localhost:8082/booking/vendor/history/"

  getVendorBookings(vendorId:any,date:any):Observable<any>{
    return this.httpClient.get<any>(this.getVendorBookingsURL+vendorId);
  }

  
}
