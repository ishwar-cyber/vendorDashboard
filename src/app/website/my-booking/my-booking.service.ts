import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerBookingResponse } from '../../interface/bookingResponse';

@Injectable({
  providedIn: 'root'
})
export class MyBookingService {

  constructor(private httpClient : HttpClient) { }

  // getDummyBookingsURL="http://localhost:8082/booking/test/";
  getDummyBookingsURL="http://localhost:8082/booking/customer/history/";
  deleteDummyBookingsURL="http://localhost:8082/booking/test/";

  getCustomerBookings(customerid:any): Observable<any>{
    return this.httpClient.get<any>(this.getDummyBookingsURL+customerid);
  }

  deleteBooking(customerId:any){
    console.log(customerId);
    return this.httpClient.delete<any>(this.deleteDummyBookingsURL+customerId);
  }
}
