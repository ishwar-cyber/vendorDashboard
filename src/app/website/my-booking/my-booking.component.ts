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

  deleteBooking(customerid: any, index:any) {
    this.myBookingservice.deleteBooking(customerid).subscribe((response) => {
      console.log(customerid)
      console.log(response);
    })
    // throw new Error('Method not implemented.');
  }

  srNoUpdate(){
    this.srNo=this.srNo+1
  }

}
