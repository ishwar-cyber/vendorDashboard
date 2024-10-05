import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
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
 
  shopLat = 18.3344;
  shopLon = 18.5621;
  vendorUrl = 'http://localhost:8081/vendor';
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
 
  router = inject(Router);
  shopService = inject(ShopService);
  sharedService = inject(SharedService);
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.shopService.getAllVendor().subscribe((response)=>{
      this.salonShop = response.payload;
    });
  }
  public redirectToShop(id:any){
    localStorage.setItem('vendorId',id)
    this.sharedService.setData(id);
    this.router.navigate([`/website/shop/${id}`])
  }
}
