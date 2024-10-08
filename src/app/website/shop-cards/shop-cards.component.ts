import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { CalculateDistance } from '../../common/calculate-distance';
import { SharedService } from '../../common/shared.service';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop-cards',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule,],
  templateUrl: './shop-cards.component.html',
  styleUrl: './shop-cards.component.scss'
})
export class ShopCardsComponent implements OnInit{
 
  shopLat = 18.5181095942;
  shopLon = 73.8532665869;
  vendorUrl = 'http://localhost:8081/vendor';
  public modalVisible: boolean =false
  public filterList = [
    {
      name:'Ac salon'
    },
    {
      name: 'spa'
    },
    {
      name: 'Mens p'
    },
    {
      name: "Rating +"
    }
  ];
  public salonShop: any;
  public filterName: Set<string> = new Set();;
  public distance: number = 0;
  public tempShopData =[];
  router = inject(Router);
  shopService = inject(ShopService);
  sharedService = inject(SharedService);
  httpClient = inject(HttpClient);



  ngOnInit(): void {
    this.shopService.getAllVendor().subscribe((response)=>{
      this.salonShop = response.payload;

      this.tempShopData =  this.salonShop
    });

    this.sharedService.getData().subscribe((res)=>{
      console.log('res',res);
      if(res){
        this.salonShop = this.salonShop?.filter((salon:any) => {
          return salon.pinCode === res;
        }); 
      } else {
        this.salonShop = this.tempShopData;
      }
     
    })
    
    this.getLocation();
  }

  public getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log('position', position);
        this.distance = CalculateDistance.calculateDistance(position.coords.latitude, position.coords.longitude,this.shopLat,this.shopLon);
      },(error)=>{
        if(error.PERMISSION_DENIED){}
      })
    }
  }
  public redirectToShop(id:any){
    localStorage.setItem('vendorId',id);

    this.sharedService.setData(id);
    this.router.navigate([`/website/shop/${id}`])
  }

  public openFilter(){
    this.modalVisible = true;
  }

  public hideModal(event:any){
    this.modalVisible = !this.modalVisible;
  }

  public applyFilter(name: any){
    this.filterName?.has(name) ? this.filterName?.delete(name) : this.filterName?.add(name);
    console.log('this.filterName',this.filterName);
    
  }
  public seletedFilter(name:any){
    return this.filterName?.has(name.name);
  }

}
