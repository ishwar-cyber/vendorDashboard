import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-webside',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './webside.component.html',
  styleUrl: './webside.component.scss'
})
export class WebsideComponent implements OnInit{

  public openLocationDropdown: boolean = false;
  public authToken: any;
  pincodeForm:any = FormGroup;
  formBuilder = inject(FormBuilder);
  ngOnInit(): void {
   this.pincodeForm = this.formBuilder.group({
      pincode:['',Validators.required,Validators.maxLength(6)],
   });

   this.authToken = localStorage.getItem('token');
   
  }
  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log('position',position);
      },(error)=>{
        if(error.PERMISSION_DENIED){
          
        }
      })
    }
  }

  public openLocation(){
    this.openLocationDropdown = !this.openLocationDropdown;
  }
  public checkPincode(){
    if(this.pincodeForm.controls.pincode.value.length === 6){
      
    }
  }
}
