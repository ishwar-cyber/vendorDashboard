import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { VendorHeaderComponent } from '../../component/vendor-header/vendor-header.component';
import { VendorBookingResponse } from '../../interface/vendorBookingResponse';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, VendorHeaderComponent, SidebarComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  vendorBookingResponse: VendorBookingResponse | undefined

  constructor(private dashboardService: DashboardService) { }

  currentDate: string | undefined;


  ngOnInit(): void {
    const date = new Date();
    this.currentDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    console.log(this.currentDate);
    localStorage.setItem("vendorId", "VED6F946C980D45014");
    this.dashboardService.getVendorBookings(localStorage.getItem("vendorId"), this.currentDate).subscribe((response) => {
      this.vendorBookingResponse = response;
      console.log(this.vendorBookingResponse);
    })

  }

  onDateChange(event: any) {
    console.log("event")
    console.log(event);
  }



}


