import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router, RouterLink } from '@angular/router';
import { CalculateDistance } from '../../common/calculate-distance';
import { SharedService } from '../../common/shared.service';
import { RatingComponent } from '../../component/rating/rating.component';
import { BookingComponent } from '../booking/booking.component';
import { ShopService } from '../shop-cards/shop.service';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [RatingComponent,RouterLink,CommonModule, BookingComponent,GoogleMapsModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss'
})
export class ShopPageComponent implements OnInit{
  
  shopLat = 18.5181095942;
  shopLon = 73.8532665869;
  // shopLat = 18.561958;
  // shopLon = 73.916926;
  public seletedServiceId:any = [];
  public selectCheckBox:boolean = false
  public vendorId: any;
  public vendorService: any;
  public openTime: boolean = false;
  public closeTime: boolean = false;
  public distance: number = 0;
  router = inject(Router);
  sharedService = inject(SharedService);
  shopService = inject(ShopService);
  distanceCal = CalculateDistance

  ngOnInit(): void {
    this.getLocation();
    this.sharedService.getData().subscribe((vendorId)=>{
     this.vendorId = vendorId ? vendorId : localStorage.getItem('vendorId');
    })
    this.shopService.getVendorById(this.vendorId).subscribe((res)=>{
      this.vendorService = res.payload;
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0'); // Get hours and pad with zero
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero
      const timeParts = `${hours}`;
      if(timeParts < this.vendorService.closingTime.split(':')[0]){
        this.openTime =true;
      } else {
        this.closeTime = true;
      }
    });
    localStorage.removeItem('selectedServices');
  }

  public getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: { lat: this.shopLat, lng: this.shopLon },
          zoom: 15,
        });
         this.distance = CalculateDistance.calculateDistance(position.coords.latitude, position.coords.longitude,this.shopLat,this.shopLon);
      },(error)=>{
        if(error.PERMISSION_DENIED){
          
        }
      })
    }
  }
  public selectService(service: any){
   service.selected = ! service.selected;
    if(service.selected){
      this.seletedServiceId?.push(service.id);
    } else{
      let bookingId =  this.seletedServiceId.findIndex((booking:any)=>{
        return booking.id === service.id;
      });
     this.seletedServiceId.splice(bookingId,1);
    }
    this.sharedService.setData(this.seletedServiceId);
  }
}
