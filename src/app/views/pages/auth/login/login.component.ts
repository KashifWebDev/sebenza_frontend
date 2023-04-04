import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from "../../../../app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {loginRequest} from "../../../../dataTypes.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  quotePic: string = '';
  loginForm: FormGroup;
  doingLogin: boolean = false;
  loginFail: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private service: AppService, private fb: FormBuilder) { }

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
    this.getPic();
  }

  submitLogin() {
    this.doingLogin = true;
    let credentials: loginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.service.login(credentials).subscribe(
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

  getPic(){
    const picList = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg"
    ];
    const random = Math.floor(Math.random() * picList.length);
    this.quotePic = picList[random];
  }

}
