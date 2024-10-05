import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserProfileService } from './user-profile-service.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  prePopulateData: any;
  showModal: boolean = false;
  userType: any='VENDOR';
  servicesList: any;
  check: any;
  manuallyAddedServices:any=[];
  existingAvailableServices:any=[];





  mob = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  name = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]);
  emailid = new FormControl('', [Validators.required, Validators.email]);
  vendorOutlet = new FormControl('');
  pincode = new FormControl('');
  state = new FormControl({ value: '', disabled: true });
  city = new FormControl('');
  address = new FormControl('');
  open = new FormControl('');
  close = new FormControl('');
  seats = new FormControl('');
  shop_mobile = new FormControl({ value: '', disabled: true });
  shop_email = new FormControl({ value: '', disabled: true });
  provided_services = new FormControl('');
  services = new FormArray<FormControl<Object>>([]);

  // Main User Profile Form
  userProfileForm = new FormGroup({
    mob: this.mob,
    name: this.name,
    emailid: this.emailid,
    vendorOutlet: this.vendorOutlet,
    pincode: this.pincode,
    state: this.state,
    city: this.city,
    address: this.address,
    openingTime: this.open,
    closingTime: this.close,
    noOfStaff: this.seats,
    shop_mobile: this.shop_mobile,
    shop_email: this.shop_email,
    services: this.services
  });


  masterServiceId = new FormControl('');
  masterServiceName = new FormControl('');
  masterServicePrice = new FormControl('');

  userProfileServicesForm = new FormGroup({
    id: this.masterServiceId,
    name: this.masterServiceName,
    price: this.masterServicePrice
  })


  ngOnInit() {
    this.fetchUserProfile();
    this.fetchMasterServices();
    console.log('Check', this.check);
  }

  userService: any
  userId: String = "";
  constructor(userService: UserProfileService, route: ActivatedRoute) {
    this.userService = userService;
    this.userId = String(route.snapshot.paramMap.get("userid"));
  }

  fetchMasterServices() {
    this.userService.fetchMasterServices().subscribe((response: any) => {
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


  fetchUserProfile() {
    this.userService.fetchUserDetailsById(this.userId).subscribe((response: any) => {
      if (response.status === "SUCCESS" && response.payload) {
        const payload = response.payload;
        this.userProfileForm.patchValue({
          mob: payload.mob || '',
          name: payload.vendorOutletName || '',
          emailid: payload.emailid || '',
          vendorOutlet: payload.vendorOutletName || '',
          pincode: payload.pinCode || '',
          state: payload.state || '',
          city: payload.city || '',
          address: payload.addressLine1 || '',
          openingTime: payload.openingTime || '',
          closingTime: payload.closingTime || '',
          noOfStaff: payload.noOfStaff || '',
          shop_mobile: payload.shop_mobile || '',
          shop_email: payload.shop_email || '',
        });
        if (payload.userType) {
          this.userType = payload.userType;
        }
        this.existingAvailableServices=payload.services;

        console.log('Fetched user data:', this.userProfileForm.value);
      } else {
        console.error('Failed to fetch user profile', response.errorBean);
      }
    });
  }

  // Open modal for adding a new service
  openModal() {
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }



  updateServiceInForm() {
    const selectedServiceName = this.masterServiceName.value;
    const selectedServicePrice = this.masterServicePrice.value;
  
    // Find the existing service in existingAvailableServices
    const existingServiceIndex = this.existingAvailableServices.findIndex((service: { serviceName: string | null; }) => service.serviceName === selectedServiceName);
  
    if (existingServiceIndex !== -1) {
      // If it exists, remove from existingAvailableServices
      const existingService = this.existingAvailableServices[existingServiceIndex];
      this.existingAvailableServices.splice(existingServiceIndex, 1);
  
      // Add to manuallyAddedServices
      const newService = {
        id: existingService.id, // or however you want to handle the ID
        name: existingService.serviceName,
        price: selectedServicePrice
      };
      this.manuallyAddedServices.push(newService);
    } else {
      // If it does not exist in existing services, just add it to manuallyAddedServices
      const newService = {
        id: Date.now(), // Generate a unique ID or use a proper ID generation method
        name: selectedServiceName,
        price: selectedServicePrice
      };
      this.manuallyAddedServices.push(newService);
    }
  
    // Clear the form controls after submission
    this.userProfileServicesForm.reset();
    this.closeModal();
  }
  



  saveProfile() {
    if (this.userProfileForm.valid) {
      // Make a POST request to save the updated profile
      console.log(this.userProfileForm.value);
      this.userService.updateVendorDetailsById(this.userId,this.userProfileForm.value).subscribe((response:any)=>{
        console.log(response);
      });
    }
  }


  deleteService(index: number) {
    this.manuallyAddedServices.splice(index, 1);
  }
}
