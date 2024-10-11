import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserOnboardServiceService } from './sign-up.service';
import { Router } from '@angular/router';
import { CalculateDistance } from '../../common/calculate-distance';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  servicesList: any = [];
  onboardingForm: FormGroup;
  userType: 'Vendor' | 'Customer' = 'Customer'
  successModal = false;
  lat: number = 0;
  long: number = 0;
  distance: number = 0;


  ngOnInit() {
    this.fetchMasterServices();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(this.lat,this.long);
      }, (error) => {
      })
    }


  }


  mobile = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  email = new FormControl('', [Validators.required, Validators.email]);

  // Vendor Additional Details
  vendorOutletName = new FormControl('');
  pinCode = new FormControl('');
  state = new FormControl('');
  city = new FormControl('');
  address = new FormControl('');
  openingTime = new FormControl('');
  closingTime = new FormControl('');
  seats = new FormControl('');
  shop_mobile = new FormControl('');
  shop_email = new FormControl('');
  provided_services = new FormControl('');
  serviceId = new FormControl('');
  price = new FormControl(0);
  services = new FormArray<FormControl<any>>([]);
  role = new FormControl('CUSTOMER');
  latitude = new FormControl('');
  longitude = new FormControl('');


  // User Additional Details
  otherDetails = new FormControl('');

  constructor(private userOnBoardingService: UserOnboardServiceService, private router: Router) {
    this.onboardingForm = new FormGroup({
      mobile: this.mobile,
      userName: this.name,
      password: this.password,
      email: this.email,
      vendorOutletName: this.vendorOutletName,
      addressLine1: this.address,
      openingTime: this.openingTime,
      closingTime: this.closingTime,
      seats: this.seats,
      shop_mobile: this.shop_mobile,
      shop_email: this.shop_email,
      otherDetails: this.otherDetails,
      pinCode: this.pinCode,
      state: this.state,
      city: this.city,
      services: this.services,
      role: this.role,
      latitude: this.latitude,
      longitude: this.longitude
    });
  }


  fetchMasterServices() {
    this.userOnBoardingService.fetchMasterServices().subscribe((response: any) => {
      if (response.status === "SUCCESS" && response.payload) {
        this.servicesList = response.payload.map((service: { id: any; serviceName: any; isActive: any; }) => ({
          id: service.id,
          name: service.serviceName,
          isActive: service.isActive
        }));
      } else {
        console.error('Failed to fetch services', response.errorBean);
      }
    });
  }

  onUserTypeChange(type: 'Vendor' | 'Customer') {
    this.userType = type;
    if (this.userType === 'Vendor') {
      this.role.setValue('VENDOR');
      this.vendorOutletName.setValidators([Validators.required]);
      this.pinCode.setValidators([Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
      this.state.setValidators([Validators.required]);
      this.city.setValidators([Validators.required]);
      this.address.setValidators([Validators.required]);
      this.openingTime.setValidators([Validators.required]);
      this.closingTime.setValidators([Validators.required]);
      this.seats.setValidators([Validators.required, Validators.min(1)]);
      this.shop_mobile.setValidators([Validators.required]);
      this.shop_email.setValidators([Validators.required]);
      this.services.setValidators([Validators.required])
      // this.otherDetails.clearValidators();
    }
    else {
      this.role.setValue('CUSTOMER');
      this.vendorOutletName.clearValidators();
      this.pinCode.clearValidators();
      this.state.clearValidators();
      this.city.clearValidators();
      this.address.clearValidators();
      this.openingTime.clearValidators();
      this.closingTime.clearValidators();
      this.seats.clearValidators();
      this.shop_mobile.clearValidators();
      this.shop_email.clearValidators();
      this.services.clearValidators();
      // this.otherDetails.setValidators([Validators.required]);
    }
  }


  // Method to handle the selection of services
  onServiceChange(serviceId: number, servicePrice: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      // this.services.push(new FormControl({ serviceId, servicePrice }));
    } else {
      const index = this.services.controls.findIndex(x => x.value === serviceId);
      if (index !== -1) {
        this.services.removeAt(index);
      }
    }
  }

  onBlur(id: number, event: any) {
    let value = event.target.value;
    this.services.push(new FormControl({ serviceId: id, price: value }));
  }

  onSuccessModalChange(b: boolean) {
    this.successModal = b;
  }


  onSubmit() {

    // add latitude and longitude in form.
    this.latitude.setValue(this.lat.toString());
    this.longitude.setValue(this.long.toString());

    this.userOnBoardingService.onboardVendor(this.onboardingForm.value).subscribe((response: any) => {
      console.log(response);
      if (response.status == "SUCCESS") {
        this.successModal = true;
        setTimeout(() => {
          this.successModal = false;
          this.router.navigate(['/login']);
        }, 2000);
      }
      else {
        // show error msg
      }
    });
  }
}
