import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  vendorUrl = 'http://localhost:8081/vendor'
  constructor(private httpClient: HttpClient) { }

  getAllVendor():Observable<Vendor>{
    return this.httpClient.get<Vendor>(this.vendorUrl);
  }

  public getVendorById(id:any){
    return this.httpClient.get<Vendor>(this.vendorUrl+`/${id}`);
  }
}
