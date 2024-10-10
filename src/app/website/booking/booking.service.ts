import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingUrl = 'http://localhost:8088/booking';
  // getBookingSlotUrl = 'http://localhost:8080/booking';
  // localhost:8082/booking/VEDAE3B376CB054DE5?date=2024-09-28

  constructor(private httpClient: HttpClient) { }

  public getBookingSlot(vendorId:any, date:any){
    let url = this.bookingUrl+`/${vendorId}?date=${date}`
   return this.httpClient.get(url);
  }
  public createBooking(payload: any,vendorId:any,customerId:any):Observable<any>{
    let url = this.bookingUrl+`/${vendorId}?customerId=${customerId}`;
    return this.httpClient.post(url, payload);
  }
}
