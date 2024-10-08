import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.scss'
})
export class AddVendorComponent implements OnInit{

  public serviceForm: any = FormGroup;
  public searchForm: any =FormGroup;
  public openFormDrawer: boolean = false;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.searchForm = this.formBuilder.group({
      search: [''],
    })
  }

 public buildForm(){
  this.serviceForm = this.formBuilder.group({
    service: ['', Validators.required],
    price:['', Validators.required],
    serviceImage:['',Validators.required]
  });
 }

  addService() {
    console.log('this.serviceForm', this.serviceForm.value);
    
    this.toastr.success('Service Added...','success');
  }
  public editService(){

  }

  public addServices(){
    this.openFormDrawer = true;
  }
  public hideModal(){
    this.openFormDrawer =!this.openFormDrawer;
  }
  public deleteService(){
    // this.toastr.delete('Hello world!', 'Toastr fun!');
  }
}
