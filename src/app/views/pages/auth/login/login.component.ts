import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AuthService} from "../auth.service";
import {UserRole} from "../../../../core/roles/UserRole";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {

  returnUrl: any;
  loginForm: FormGroup;
  doingLogin: boolean = false;
  formSubmitted: boolean = false;
  loginFail: boolean = false;
  showLoginForm: boolean = false;
  loginUserType: UserRole;

  constructor(private router: Router, private route: ActivatedRoute,
              private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/auth/superAdmin':
        this.loginUserType = UserRole.superAdmin;
        break;
      case '/auth/login':
        this.loginUserType = UserRole.User;
        break;
    }
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToDashboard();
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.errSubject.subscribe(data =>{
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

  ngAfterViewChecked() {
    if (!this.authService.isLoggedIn()) {
      setTimeout(() => {
        this.showLoginForm = true;
      });
    }
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
      this.loginForm.controls['password'].value,
      this.loginUserType
    ).subscribe(
      (response) => {
        if(response.status && response.data?.user){
          this.authService.userType = response.data.user.roles[0].name;
          this.authService.setSession(response.data.token, response.data.user);
          this.authService.redirectToDashboard()
        }else{
          this.doingLogin = false;
          this.loginFail = true;
          Swal.fire({
            title: 'Login Failed!',
            text: 'Login failed. Please check your email and password and try again.',
            icon: 'error'
          });
        }
      });
  }

  getLoginText(): string{
    if (this.loginUserType == UserRole.superUser) return " Super Admin";
    return '';
  }
}
