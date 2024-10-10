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
  imports: [RatingComponent,RouterLink,CommonModule, BookingComponent, GoogleMapsModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss'
})
export class ShopPageComponent implements OnInit{
  
  shopLat = 18.5181095942;
  shopLon = 73.8532665869;
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

  constructor(){
      //   const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      //     center: { lat: this.shopLat, lng: this.shopLon },
      //     zoom: 15,
      //   });
      //   // Optional: Add a marker to the map
      //   const marker = new google.maps.Marker({
      //     position: { lat: this.shopLat, lng: this.shopLon },
      //     map: map,
      //     title: 'Shop Location',
      //   });
      // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition((position)=>{
      //     // const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      //     //   center: { lat: this.shopLat, lng: this.shopLon },
      //     //   zoom: 15,
      //     // });
         
      //      this.distance = CalculateDistance.calculateDistance(position.coords.latitude, position.coords.longitude,this.shopLat,this.shopLon);
      //   },(error)=>{
      //     if(error.PERMISSION_DENIED){
            
      //     }
      //   })
      // }

  }
  ngOnInit(): void {
    this.sharedService.getData().subscribe((vendorId)=>{
     this.vendorId = vendorId ? vendorId : localStorage.getItem('vendorId');
    })
    this.shopService.getVendorById(this.vendorId).subscribe((res)=>{
      this.vendorService = res.payload;  
      console.log('this.vendorService', this.vendorService.closingTime);
      
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
  public selectService(service: any){
   service.selected = ! service.selected;
    if(service.selected){
      this.seletedServiceId?.push(service.vendorServicekey);
    } else{
      let bookingId =  this.seletedServiceId.findIndex((booking:any)=>{
        return booking.vendorServicekey === service.vendorServicekey;
      });
     this.seletedServiceId.splice(bookingId,1);
    }
    this.sharedService.setData(this.seletedServiceId);
  }
}
