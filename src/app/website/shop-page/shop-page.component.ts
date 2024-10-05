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
 
  public spaServices = [
    {
      id: 1,
      price: 100,
      serviceName: "Swedish Massage",
      image: 'https://images.pexels.com/photos/5659007/pexels-photo-5659007.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      shopId:1,
      selected:false,
    },
    {
      id: 2,
      price: 120,
      serviceName: "Deep Tissue Massage",
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7,
      shopId:2,
      selected:false,
    },
    {
      id: 3,
      price: 80,
      serviceName: "Aromatherapy",
      image: 'https://images.pexels.com/photos/5659007/pexels-photo-5659007.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 3,
      shopId:3,
      selected:false,
    },
    {
      id: 4,
      price: 90,
      serviceName: "Hot Stone Massage",
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.6,
      shopId:4,
      selected:false,
    },
    {
      id: 5,
      price: 70,
      serviceName: "Facial Treatment",
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      shopId:5,
      selected:false,
    },
    {
      id: 6,
      price: 50,
      serviceName: "Body Scrub",
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.4,
      shopId:6,
      selected:false,
    },
    {
      id: 7,
      price: 60,
      serviceName: "Reflexology",
      image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.3,
      shopId:7,
      selected:false,
    }
  ];

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
          // center: { lat: position.coords.latitude, lng: position.coords.longitude },
          center: { lat: this.shopLat, lng: this.shopLon },
          zoom: 15,
        });
         this.distance = CalculateDistance.calculateDistance(position.coords.latitude, position.coords.longitude,this.shopLat,this.shopLon);
        // const distance = this.distanceCal.calculateDistance(position.coords.latitude, position.coords.longitude,this.shopLat,this.shopLon);
        console.log('distance',this.distance);
        // this.distance = this.distance
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
