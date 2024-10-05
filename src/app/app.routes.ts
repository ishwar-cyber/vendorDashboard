import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { AddVendorComponent } from './pages/add-vendor/add-vendor.component';
import { BookingComponent } from './pages/booking/booking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path:'', component:SignInComponent
    },
    {
        path:'login', component:SignInComponent
    },
    {
        path:'register', component:SignUpComponent
    },
    {
        path:'dashboard', component:DashboardComponent,

        children:[
            {
                path:'addservice', component:AddVendorComponent
            },
            {
                path:'addstaff', component:AddStaffComponent
            },
            {
                path:'booking', component:BookingComponent
            },
            {
                path:'profile', component: AddStaffComponent //"Component name here"
            },
        ]
    },
   
    {
        path:'**',
        component: PageNotFoundComponent
    }
];
