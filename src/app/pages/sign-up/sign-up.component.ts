import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserOnboardServiceService } from './sign-up.service';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  // Define available services from API Get Call.
  servicesList = [
    { id: 1, name: 'Haircut' },
    { id: 2, name: 'Shave' },
    { id: 3, name: 'Facial' },
    { id: 4, name: 'Hair Coloring' }
  ];


  onboardingForm: FormGroup;
  userType: 'Vendor' | 'User' = 'User'; // Default to Vendor



  mob = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailid = new FormControl('', [Validators.required, Validators.email]);

  // Vendor Additional Details
  vendorOutlet = new FormControl('');
  pincode = new FormControl('');
  state = new FormControl('');
  city = new FormControl('');
  address = new FormControl('');
  open = new FormControl('');
  close = new FormControl('');
  seats = new FormControl('');
  shop_mobile = new FormControl('');
  shop_email = new FormControl('');
  provided_services = new FormControl('');
  services = new FormArray<FormControl<any>>([]);
  role = new FormControl('USER');

  // User Additional Details
  otherDetails = new FormControl('');

  constructor(private userOnBoardingService: UserOnboardServiceService) {
    this.onboardingForm = new FormGroup({
      mob: this.mob,
      name: this.name,
      password: this.password,
      emailid: this.emailid,
      vendorOutlet: this.vendorOutlet,
      address: this.address,
      open: this.open,
      close: this.close,
      seats: this.seats,
      shop_mobile: this.shop_mobile,
      shop_email: this.shop_email,
      otherDetails: this.otherDetails,
      pincode: this.pincode,
      state: this.state,
      city: this.city,
      services: this.services,
      role: this.role
    });
  }

  onUserTypeChange(type: 'Vendor' | 'User') {
    this.userType = type;
    if (this.userType === 'Vendor') {
      this.role.setValue('VENDOR');
      this.vendorOutlet.setValidators([Validators.required]);
      this.pincode.setValidators([Validators.required]);
      this.state.setValidators([Validators.required]);
      this.city.setValidators([Validators.required]);
      this.address.setValidators([Validators.required]);
      this.open.setValidators([Validators.required]);
      this.close.setValidators([Validators.required]);
      this.seats.setValidators([Validators.required, Validators.min(1)]);
      this.shop_mobile.setValidators([Validators.required]);
      this.shop_email.setValidators([Validators.required]);
      this.services.setValidators([Validators.required])
      this.otherDetails.clearValidators();

    }
    else {
      this.role.setValue('USER');
      this.vendorOutlet.clearValidators();
      this.pincode.clearValidators();
      this.state.clearValidators();
      this.city.clearValidators();
      this.address.clearValidators();
      this.open.clearValidators();
      this.close.clearValidators();
      this.seats.clearValidators();
      this.shop_mobile.clearValidators();
      this.shop_email.clearValidators();
      this.services.clearValidators();
      this.otherDetails.setValidators([Validators.required]);
    }
  }


  // Method to handle the selection of services
  onServiceChange(serviceId: number, event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.services.push(new FormControl(serviceId));
    } else {
      const index = this.services.controls.findIndex(x => x.value === serviceId);
      if (index !== -1) {
        this.services.removeAt(index);
      }
    }
  }


  onSubmit() {

    this.userOnBoardingService.onboardVendor(this.onboardingForm.value).subscribe((response: any) => {
      console.log(response);
    });


  }


}
