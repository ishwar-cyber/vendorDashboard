import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingUrl = 'http://localhost:8082/booking';

  constructor(private httpClient: HttpClient) { }

  public getBookingSlot(vendorId:any, date:any):Observable<any>{
    let url = this.bookingUrl+`/${vendorId}?date=${date}`
   return this.httpClient.get(url);
  }
  public createBooking(payload: any,vendorId:any,customerId:any):Observable<any>{
    let url = this.bookingUrl+`/${vendorId}?customerId=${customerId}`;
    return this.httpClient.post(url, payload);
  }
}
