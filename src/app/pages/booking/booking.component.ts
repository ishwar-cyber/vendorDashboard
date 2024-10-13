import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VendorBookingResponse } from '../../interface/vendorBookingResponse';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
  vendorBookingResponse: VendorBookingResponse | undefined

  constructor(private dashboardService: DashboardService,
    private fb: FormBuilder
  ) { }


  currentDate: any;

  dateFormGroup: FormGroup | undefined;



  ngOnInit(): void {
    const date = new Date();
    this.currentDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    this.getVendorBookingDet(this.currentDate);

    // this.dateFormGroup = this.fb.group({
    //   defaultDate:['10-10-2024']
    // })
    
    // this.dashboardService.getVendorBookings(localStorage.getItem("vendorId"), this.currentDate).subscribe((response) => {
    //   this.vendorBookingResponse = response;
    //   console.log(this.vendorBookingResponse);
    // })

  }

  onDateChange(event: any) {
    this.getVendorBookingDet(event.target.value)
  }

  public getVendorBookingDet(date: any) {
    this.dashboardService.getVendorBookings(localStorage.getItem("vendorId"), date).subscribe((response) => {
      this.vendorBookingResponse = response;
      console.log(this.vendorBookingResponse);
    })
  };

}
