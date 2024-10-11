import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-webside',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './webside.component.html',
  styleUrl: './webside.component.scss'
})
export class WebsideComponent implements OnInit{

  public openLocationDropdown: boolean = false;
  public authToken: any;
  public customerId:any;
  pincodeForm:any = FormGroup;
  pincode: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService
    ){}

  ngOnInit(): void {
    
   this.pincodeForm = this.formBuilder.group({
      pincode:['',[Validators.required,Validators.maxLength(6)]],
   });
   this.authToken = localStorage.getItem('token');
   this.customerId = localStorage.getItem('customerId')
  }
  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log('position',position);
      },(error)=>{
        if(error.PERMISSION_DENIED){}
      })
    }
  }

  public openLocation(){
    this.openLocationDropdown = false;
  }
  public checkPincode(){
   this.pincode = this.pincodeForm.controls.pincode.value;
    if(this.pincodeForm.controls.pincode.value.length === 6){
      this.sharedService.setData( Number(this.pincode));
    } else  if(this.pincodeForm.controls.pincode.value.length === 0){
      this.sharedService.setData( Number(this.pincode));
    }
  }
}
