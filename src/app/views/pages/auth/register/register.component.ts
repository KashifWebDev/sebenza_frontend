import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {confirmPasswordValidator} from "../../../../core/validators/confirm-password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  stepsTitle : string[] = ['1', '2', '3', '4', '5'];


  public accountTypes: string[] = ['Law Firm', 'Accounting', 'Construction', 'Event Management', 'Logistics', 'Project Management', 'Retailers', 'Others'];
  constructor(private router: Router,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      cpassword : ['', Validators.required]
    },{
      validator: confirmPasswordValidator('password', 'cpassword')
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      company : ['', Validators.required],
      type : [''],
      country : ['', Validators.required],
      city : ['', Validators.required],
      address : ['', Validators.required],
      mobile : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
  }


  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    if(this.validationForm1.valid) {
      this.stepsTitle[0] = '✓';
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    console.log("test");
    if(this.validationForm2.valid) {
      this.stepsTitle[1] = '✓';
      this.wizardForm.goToNextStep();
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

}
