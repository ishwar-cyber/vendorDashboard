import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public sidebarList =[
    {
      icon:'fa-solid fa-house',
      name: 'Dashboard',
      redirectTo:'/dashboard'
    },
    {
      icon:'fa-solid fa-plus',
      name: 'Add Service',
      redirectTo:'/dashboard/addservice'
    },
    {
      icon:'fa-solid fa-book',
      name: 'Booking',
      redirectTo:'/dashboard/booking'
    },
    {
      icon:'',
      name: 'Add staff',
      redirectTo:'/dashboard/addstaff'
    },
    {
      icon:'',
      name: 'Dashboard',
      redirectTo:'dashboard'
    },
    {
      icon:'',
      name:'Profile',
      redirectTo:'/dashboard/profile'
    }
  ]
}
