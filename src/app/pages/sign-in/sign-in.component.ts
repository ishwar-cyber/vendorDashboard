import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, viewChild, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  loginForm:any = FormGroup;
  loginErrorMessage: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) 
  {
    this.loginForm = this.formBuilder.group({
      mobile:['', [Validators.required, Validators.maxLength(10),this.checkMobileNumber]],
      password:['', [Validators.required, Validators.maxLength(15)]]
    })
  }

  ngOnInit(): void {
    // login Form Control

  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  public login() {
    console.log('login form', this.loginForm.invalid);
    if(this.loginForm.valid){
      this.signInService.login(this.loginForm.value).subscribe((response:any)=>{
        if(response.status==="SUCCESS"){
          localStorage.setItem('customerId',response.payload.userId);
          let checkRedirection = localStorage.getItem('redirectTo');
          if(checkRedirection){
            localStorage.removeItem('redirectTo');
            this.router.navigate(["/website/mybooking"]);
          } else {
            if(response.payload.role === 'CUSTOMER')
            localStorage.setItem('customerId',response.payload.userId);
              this.router.navigate(["/website/home"]);
            } 
            if(response.payload.role === 'VENDOR'){
              localStorage.setItem('vendorId',response.payload.userId);
              this.router.navigate(["/dashboard/booking"]);
           }
        } else {
          this.router.navigate(["/"]);
        }
      });
    } else {
      this.loginErrorMessage = true;
    }
  }

  public checkMobileNumber(control: AbstractControl){
    const valid = /^[6789]/.test(control.value);
    return valid ? null : { invalidMobile: { value: control.value } };
  }


}
