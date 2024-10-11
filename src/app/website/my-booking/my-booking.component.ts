import { Component, OnInit } from '@angular/core';
import { CustomerBookingResponse } from '../../interface/bookingResponse';
import { MyBookingService } from './my-booking.service';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent implements OnInit{

  srNo = 0;

  constructor(private myBookingservice: MyBookingService) { };

  customerBookingResponse: CustomerBookingResponse | undefined

  ngOnInit(): void {
    let customerId = localStorage.getItem('customerId');
    this.myBookingservice.getCustomerBookings(localStorage.getItem("customerId")).subscribe((response) => {
      this.customerBookingResponse = response
      console.log(this.customerBookingResponse);
    })
  }

  deleteBooking(bookingId:any, vendorId:any, vendorServiceKey:any, ivar:any,jvar:any) {
    this.myBookingservice.updateBooking(bookingId,vendorId,vendorServiceKey).subscribe((response) => {
      console.log(response);
      this.customerBookingResponse?.payload?.serviceHistory[ivar].services.splice(jvar,1);
    })
    
  }

  srNoUpdate(){
    this.srNo=this.srNo+1
  }

}
