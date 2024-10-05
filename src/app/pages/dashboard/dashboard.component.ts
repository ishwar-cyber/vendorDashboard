import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { VendorHeaderComponent } from '../../component/vendor-header/vendor-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,VendorHeaderComponent,SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
