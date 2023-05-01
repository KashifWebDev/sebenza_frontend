import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from "../../../../app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {loginRequest} from "../../../../dataTypes.interface";
import Swal from "sweetalert2";
import {AuthService} from "../auth.service";

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
              private service: AppService, private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
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
    let credentials: loginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.login(credentials).subscribe(
      response => {
        if(response.status){
          this.service.setSession(response.data.token);
          this.router.navigate(['/']);
        }else{
          this.loginFail = true;
          Swal.fire({
            title: 'Login Failed!',
            text: response.message,
            icon: 'error'
          });
        }
        this.doingLogin = false;
      });
  }

}
