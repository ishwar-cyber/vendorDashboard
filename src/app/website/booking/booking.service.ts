import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingUrl = 'http://localhost:8080/booking';

  constructor(private httpClient: HttpClient) { }

  public createBooking(payload: any){
    return this.httpClient.post(this.bookingUrl, payload);
  }
}
