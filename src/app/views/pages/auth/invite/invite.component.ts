import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  registrationForm: FormGroup;
  invitedEmail: string | null = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.invitedEmail = this.route.snapshot.paramMap.get('email');
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [{value: this.invitedEmail, disabled: true}, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  submitForm() {
    // Implement your form submission logic here
    if (this.registrationForm.valid) {
      var formData = new FormData();
      formData.append('first_name', this.registrationForm.controls['first_name'].value);
      formData.append('last_name', this.registrationForm.controls['last_name'].value);
      formData.append('email', this.registrationForm.controls['email'].value);
      formData.append('password', this.registrationForm.controls['password'].value);
      formData.append('country', this.registrationForm.controls['country'].value);
      formData.append('city', this.registrationForm.controls['city'].value);
      formData.append('address', this.registrationForm.controls['address'].value);
      formData.append('phone', this.registrationForm.controls['phone'].value);

      this.authService.invite(formData).subscribe(res => {
        if(res.status){
          setTimeout(() => {
            if(res.data){
              console.log(res);
              this.router.navigate(['/']);
            }
          }, 3000)
        }
      });

    } else {
      // Form is invalid, mark fields as touched to display error messages
      this.registrationForm.markAllAsTouched();
      console.log('invalid');
      console.log(this.registrationForm.value);
    }
  }

}
