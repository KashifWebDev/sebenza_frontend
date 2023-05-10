import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {confirmPasswordValidator} from "../../../../core/validators/confirm-password.validator";
import Swal from "sweetalert2";
import {AuthService} from "../auth.service";
import {accountType, ApiResponse, Package} from "../../../../core/interfaces/interfaces";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  showLoginBtn: boolean = true;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  stepsTitle : string[] = ['1', '2', '3'];
  employees : Package[];
  signedUp: boolean = false;
  formData: any = new FormData();


  public accountTypes: { id: number, name: string }[] = [
    { id: 1, name: 'Law Firm' },
    { id: 2, name: 'Accounting' },
    { id: 3, name: 'Construction' },
    { id: 4, name: 'Event Management' },
    { id: 5, name: 'Logistics' },
    { id: 6, name: 'Project Management' },
    { id: 7, name: 'Retailers' },
    { id: 8, name: 'Others' }
  ];
  constructor(private router: Router,public formBuilder: FormBuilder,
              private authService: AuthService, private appService: AppService) { }

  ngOnInit(): void {

    this.authService.getAccTypes().subscribe((res: ApiResponse<accountType[]>) => {
      if(res.status){
        this.accountTypes  = res.data!.filter( (data: accountType) => {
          return data.status == 'Active';
        }).map( (element: accountType) => {
          return {
            id: element.id,
            name: element.account_type
          }
        });
      }
    });

    this.authService.getPackagesType().subscribe((res: ApiResponse<Package[]>) => {
      if(res.status){
        this.employees  = res.data!.filter( (data: Package) => {
          return data.status == 'Active';
        }).map( (element: Package) => {
          return {
            id: element.id,
            account_package: element.account_package
          }
        });
      }
    });

    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      cpassword : ['', Validators.required]
    },{
      validator: confirmPasswordValidator('password', 'cpassword')
    });

    this.validationForm2 = this.formBuilder.group({
      company : ['', Validators.required],
      type : [''],
      country : ['', Validators.required],
      city : ['', Validators.required],
      address : ['', Validators.required],
      mobile : ['', Validators.required],
      employees : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }

  get form1() {
    return this.validationForm1.controls;
  }

  get form2() {
    return this.validationForm2.controls;
  }

  form1Submit() {
    if(this.validationForm1.valid) {
      this.stepsTitle[0] = '✓';
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  form2Submit() {
    if(this.validationForm2.valid) {
      this.showLoginBtn = false;
      this.stepsTitle[1] = '✓';
      this.wizardForm.goToNextStep();
      this.congratsAlert();


      this.formData.append('first_name', this.validationForm1.controls['firstName'].value);
      this.formData.append('last_name', this.validationForm1.controls['lastName'].value);
      this.formData.append('email', this.validationForm1.controls['email'].value);
      this.formData.append('password', this.validationForm1.controls['password'].value);
      this.formData.append('company_name', this.validationForm2.controls['company'].value);
      this.formData.append('account_type_id', this.validationForm2.controls['type'].value);
      this.formData.append('country', this.validationForm2.controls['country'].value);
      this.formData.append('city', this.validationForm2.controls['city'].value);
      this.formData.append('address', this.validationForm2.controls['address'].value);
      this.formData.append('phone', this.validationForm2.controls['mobile'].value);
      this.formData.append('user_limit_id', this.validationForm2.controls['employees'].value);

      this.authService.register(this.formData).subscribe(res => {
        if(res.status){
          this.signedUp = true;
          setTimeout(() => {
            this.authService.setSession(res.data?.token, res.data?.user);
            this.router.navigate(['/']);
          }, 3000)
        }else{
          this.signedUp = false;
          this.showLoginBtn = true;
          this.stepsTitle[1] = '2';
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Seems like '+res.message+'!',
          })
          let stepNum = res.message === 'Email Already Taken' ? 0 : 1;
          this.wizardForm.goToStep(stepNum);
        }
      });
    }
    this.isForm2Submitted = true;
  }

  onRegister(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/']);
    }
  }

  congratsAlert(){
    this.appService.swalFire('Signed up successfully', 'success');
  }

}
