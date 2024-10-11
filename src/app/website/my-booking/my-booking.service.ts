import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerBookingResponse } from '../../interface/bookingResponse';

@Injectable({
  providedIn: 'root'
})
export class MyBookingService {

  constructor(private httpClient : HttpClient) { }

  getDummyBookingsURL="http://localhost:8082/booking/customer/history/";
  updateBookingURL="http://localhost:8082/booking/remove/service/";

  getCustomerBookings(customerid:any): Observable<any>{
    return this.httpClient.get<any>(this.getDummyBookingsURL+customerid);
  }

  updateBooking(bookingId:any, vendorId:any, vendorServiceKey:any){
    console.log(bookingId);
    return this.httpClient.put<any>(this.updateBookingURL+bookingId
      +"?vendorId="+vendorId
    +"&vendorServiceKey="+vendorServiceKey,{});
  }
}
