import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserProfileService } from './user-profile-service.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
  userType: any = 'VENDOR';
  servicesList: any;
  check: any;
  manuallyAddedServices: any = [];
  existingAvailableServices: any = [];





  mob = new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  name = new FormControl('', [Validators.required]);
  // emailid = new FormControl('', [Validators.required, Validators.email]);
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
    // emailid: this.emailid,
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
  }

  userProfileService: any
  userId: String = "";
  router: any;
  constructor(userProfileService: UserProfileService, route: ActivatedRoute, router: Router) {
    this.userProfileService = userProfileService;
    this.router = router;
    this.userId = String(route.snapshot.paramMap.get("userid"));
  }

  fetchMasterServices() {
    this.userProfileService.fetchMasterServices().subscribe((response: any) => {
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
    this.userProfileService.fetchUserDetailsById(this.userId).subscribe((response: any) => {
      if (response.status === "SUCCESS" && response.payload) {
        const payload = response.payload;
        this.userProfileForm.patchValue({
          mob: payload.mobile || '',
          name: payload.vendorOutletName || '',
          // emailid: payload.emailid || '',
          vendorOutlet: payload.vendorOutletName || '',
          pincode: payload.pinCode || '',
          state: payload.state || '',
          city: payload.city || '',
          address: payload.addressLine1 + payload.addressLine2 || '',
          openingTime: payload.openingTime || '',
          closingTime: payload.closingTime || '',
          noOfStaff: payload.noOfStaff || '',
          shop_mobile: payload.shop_mobile || '',
          shop_email: payload.shop_email || '',
          services: payload.services
        });
        if (payload.userType) {
          this.userType = payload.userType;
        }

        // Set Existing services
        const servicesArray = this.userProfileForm.get('services') as FormArray;
        servicesArray.clear();
        payload.services.forEach((service: { vendorServicekey: any; serviceName: any; price: any; }) => {
          const serviceGroup = new FormGroup({
            id: new FormControl(service.vendorServicekey),
            name: new FormControl(service.serviceName),
            price: new FormControl(service.price),
          });
          servicesArray.push(serviceGroup);
        });

        this.existingAvailableServices = payload.services;
        console.log('Eisting', this.existingAvailableServices);
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
    const xyz = this.servicesList.findIndex((service: { name: number | null; }) => service.name === selectedServiceName);
    const selectedServiceId = this.servicesList[xyz]?.id;

    // Find the existing service in existingAvailableServices & delete if already found 
    const existingServiceIndex = this.existingAvailableServices.findIndex((service: { serviceId: number | null; }) => service.serviceId === selectedServiceId);
    if (existingServiceIndex !== -1) {
      const existingService = this.existingAvailableServices[existingServiceIndex];
      existingService.price = selectedServicePrice;
    }
    else {
      const existingServiceIndex = this.manuallyAddedServices.findIndex((service: { id: number | null; }) => service.id === selectedServiceId);

      const newService = {
        serviceId: selectedServiceId,
        serviceName: selectedServiceName,
        price: selectedServicePrice
      };
      if (existingServiceIndex === -1) {
        this.manuallyAddedServices.push(newService);
      }
      else {
        this.manuallyAddedServices.splice(existingServiceIndex, 1);
        this.manuallyAddedServices.push(newService);
      }

    }

    // this.userProfileServicesForm.reset();
    // concat both manually and existing services and put in the final request.

    // Create a new FormArray from both existing and manually added services
    const combinedServices = [...this.existingAvailableServices, ...this.manuallyAddedServices];
    const servicesArray = this.userProfileForm.get('services') as FormArray;
    servicesArray.clear();
    combinedServices.forEach(service => {
      const serviceGroup = new FormGroup({
        serviceId: new FormControl(service.serviceId),
        serviceName: new FormControl(service.serviceName),
        price: new FormControl(service.price),
      });
      servicesArray.push(serviceGroup);
    });


    this.closeModal();
  }




  saveProfile() {
    console.log(this.userProfileForm)
    if (this.userProfileForm.valid) {
      // Make a POST request to save the updated profile
      console.log('Request', this.userProfileForm.value);
      this.userProfileService.updateVendorDetailsById(this.userId, this.userProfileForm.value).subscribe((response: any) => {
        console.log(response);
        if (response.status == "SUCCESS") {
          // refresh and show success alert
          alert("Details Updated Successfully")
          window.location.reload();
          this.router.navigate("/profile/" + this.userId);
        }
      });
    }
  }


  deleteService(id: number) {
    const index = this.manuallyAddedServices.findIndex((service: { id: number; }) => service.id === id);
    if (index !== -1) {
      this.manuallyAddedServices.splice(index, 1);
    }
  }
}
