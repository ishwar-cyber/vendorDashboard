import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.scss'
})
export class AddStaffComponent {

  staffForm:any = FormGroup;
  public openFormDrawer: boolean = false;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
    ){}

  public openStaffForm(){
    this.openFormDrawer = true;
  }

  public deleteService(){

  }

  public hideModal(){

  }
  public addStaff(){
    this.toastrService.success('success added ...', 'success')
  }
}
