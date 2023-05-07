import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AuthService} from "../auth.service";
import {ApiResponse, AuthResponse} from "../../../../core/interfaces/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loginForm: FormGroup;
  doingLogin: boolean = false;
  formSubmitted: boolean = false;
  loginFail: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.loginStatusSubject.subscribe(data =>{
      console.log(data);
      if(!data.success){
        this.doingLogin = false;
        Swal.fire({
          title: data.title,
          text: data.text,
          icon: 'error'
        }).then(() => {
          // console.log("in Then");
          // this.service.logout();
          // this.router.navigate(['/']);
        });
      }
    })
  }

  submitLogin() {
    this.formSubmitted = true;
    this.doingLogin = true;
    if(!this.loginForm.valid) {
      console.log(this.loginForm);
      this.doingLogin = false;
      return;
    }
    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).subscribe(
      (response: ApiResponse<AuthResponse>) => {
        if(response.status){
          this.authService.setSession(response.data?.token, response.data?.user);
          this.router.navigate(['/']);
        }else{
          this.loginFail = true;
          Swal.fire({
            title: 'Login Failed!',
            text: 'Login failed. Please check your email and password and try again.',
            icon: 'error'
          });
        }
        this.doingLogin = false;
      });
  }

}
