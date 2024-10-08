import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, viewChild, viewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from './sign-in.service';
import { DrawerComponent } from '../../component/drawer/drawer.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule, DrawerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  // @viewChildren(DrawerComponen public drawer:QueryList<DrawerComponent>; 
  loginForm:any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) 
  {
    this.loginForm = this.formBuilder.group({
      mobile:['', [Validators.required, Validators.maxLength(10),this.checkMobileNumber]],
      password:['', [Validators.required, Validators.maxLength(8)]]
    })
  }

  ngOnInit(): void {
    // login Form Control

  }

  public login() {
    console.log('login form', this.loginForm?.controls);
    this.signInService.login(this.loginForm.value).subscribe((response:any)=>{
      console.log(response);
      if(response.status==="SUCCESS"){
        this.router.navigate(["/website/home"])
      }
    });
  }

  public checkMobileNumber(control: AbstractControl){
    const valid = /^[6789]/.test(control.value);
    return valid ? null : { invalidMobile: { value: control.value } };
  }


}
