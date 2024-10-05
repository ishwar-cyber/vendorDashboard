import { Routes } from '@angular/router';
import { gaurdGuard } from './common/gaurd.guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { AddVendorComponent } from './pages/add-vendor/add-vendor.component';
import { BookingComponent } from './pages/booking/booking.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MyBookingComponent } from './website/my-booking/my-booking.component';
import { ShopCardsComponent } from './website/shop-cards/shop-cards.component';
import { ShopPageComponent } from './website/shop-page/shop-page.component';
import { WebsideComponent } from './website/webside.component';

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
        path:'website', component: WebsideComponent, title: 'Website',
        children:[
            {
                path:'', component: ShopCardsComponent,title:'Home'
            },
            {
                path:'home', component: ShopCardsComponent,title:'Home'
            },
            {
                path:'shop/:id', component: ShopPageComponent,title:'Shop'
            },
            {
                path:'booking/:id', component:BookingComponent, title:'Booking Service'
            },
            {
                path:'mybooking', component:MyBookingComponent, title:'Booking Service',canActivate: [gaurdGuard],
            }
        ]
    },
   
    {
        path:'**',
        component: PageNotFoundComponent
    }
];
