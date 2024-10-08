import { Component } from '@angular/core';
import { CustomerBookingResponse } from '../../interface/bookingResponse';
import { MyBookingService } from './my-booking.service';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent {

  srNo = 0;

  customerId: string = "abc";

  constructor(private myBookingservice: MyBookingService) { };

  customerBookingResponse: CustomerBookingResponse | undefined

  ngOnInit(): void {

    localStorage.setItem("customerId", "CU2E200075A50B618E");
    localStorage.setItem("token","pqr")
    console.log(localStorage.getItem("token"))
    // if (localStorage.getItem("customerId")!=undefined ||null ) {
      // this.customerId = localStorage.getItem("customerId");
    // }
    this.myBookingservice.getCustomerBookings(localStorage.getItem("customerId")).subscribe((response) => {
      this.customerBookingResponse = response
      console.log(this.customerBookingResponse);
    })
  }

  deleteBooking(bookingId:any, vendorId:any, vendorServiceKey:any, ivar:any,jvar:any) {
    // console.log( ivar, jvar)
    // console.log(this.customerBookingResponse?.payload?.serviceHistory[ivar].services[jvar]);
    
    this.myBookingservice.updateBooking(bookingId,vendorId,vendorServiceKey).subscribe((response) => {
      
      console.log(response);
      this.customerBookingResponse?.payload?.serviceHistory[ivar].services.splice(jvar,1);
      // console.log(this.customerBookingResponse?.payload?.serviceHistory);
    })
    
  }

  srNoUpdate(){
    this.srNo=this.srNo+1
  }

}
