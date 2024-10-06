import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  loginForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signInService: SignInService
  ) 
  {
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(8)]]
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
        this.router.navigate(["/website/Home"])
      }
    });
  }



}
