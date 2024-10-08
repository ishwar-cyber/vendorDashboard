import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingUrl = 'http://localhost:8082/booking';
  getBookingSlotUrl = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  public getBookingSlot(vendorId:any){
   return this.httpClient.get(this.getBookingSlotUrl);
  }
  public createBooking(payload: any,vendorId:any,customerId:any){
    let url = this.bookingUrl+`/${vendorId}?customerId=${customerId}`;
    return this.httpClient.post(url, payload);
  }
}
