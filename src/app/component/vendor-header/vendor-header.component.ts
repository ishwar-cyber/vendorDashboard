import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vendor-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vendor-header.component.html',
  styleUrl: './vendor-header.component.scss'
})
export class VendorHeaderComponent {

  vendorProfile: boolean =false;
   userProfile =[
    {
      name: 'Profile',
      redirectTo:'/dashboard/profile'
    },
    {
      name: 'Sign out',
      redirectTo:'/login'
    }
  ];

  openProfile(){
    this.vendorProfile =!this.vendorProfile;
  }
}
