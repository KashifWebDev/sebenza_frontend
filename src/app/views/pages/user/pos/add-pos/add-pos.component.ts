import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {product} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-add-pos',
  templateUrl: './add-pos.component.html',
  styleUrls: ['./add-pos.component.scss']
})
export class AddPosComponent implements OnInit {

  posForm: FormGroup;
  isEditMode: boolean = false;
  posID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  products: product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.posID = +params['edit'];
      this.isEditMode = !!this.posID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        // Fetch user details by userId or use the provided user data
        const user = this.userService.getSingleStock(this.posID).subscribe(
          (res) => {
            if(res.status && res.data?.stocks){
              this.loading = false;
              this.populateForm(res.data.stocks);
            }else{
              this.appService.swalFire(res.message, 'error');
            }
          },
          (error) => {
            this.appService.swalFire('An error was occurred while fetching stock details!', 'error');
          }
        );
      }
    });
    this.userService.getProducts().subscribe(
      res => {
        if(res.status && res.data?.products.length){
          this.products = res.data.products;
        }
        this.loading = false;
      },
      error => {
        this.appService.swalFire('Error occurred while listing products', 'error');
        this.loading = false;
      });
  }

  get form() {
    return this.posForm.controls;
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.posForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
      customer_phone: ['', Validators.required],
      status: ['', Validators.required],
      customer_address: ['', Validators.required],
      amount_total: ['', Validators.required],
      discount: ['', Validators.required],
      payment_type: ['', Validators.required],
      trx_id: ['', Validators.required],
      payment_date: ['', Validators.required],
      paid_amount: ['', Validators.required],
      comment: ['', Validators.required],
      items: this.formBuilder.array([]),
    });
    this.addItemToFormArray();
  }

  addItemToFormArray(item?: any) {
    const itemFormGroup = this.formBuilder.group({
      product_id: [item ? item.product_id : ''],
      quantity: [item ? item.quantity : ''],
      UnitPrice: [item ? item.itemPrice : ''],
      color: [item ? item.color : '#727cf5'],
      size: [item ? item.size : null],
      weight: [item ? item.weight : null],
    });

    (this.posForm.get('items') as FormArray).push(itemFormGroup);
  }

  get formControls(){
    return this.posForm.controls['items'] as FormArray;
  }

  populateForm(form: any)  {
    this.posForm.patchValue({
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      status: form.status,
      customer_address: form.customer_address,
      amount_total: form.amount_total,
      discount: form.discount,
      payment_type: form.payment_type,
      payment_date: form.payment_date,
      paid_amount: form.paid_amount,
      comment: form.comment,
      trx_id: form.trx_id,
    });


    // Clear existing items in the FormArray
    while (this.formControls.length !== 0) {
      this.formControls.removeAt(0);
    }

    // Add items from the data to the FormArray
    for (const item of form.items) {
      this.addItemToFormArray(item);
    }
  }

  onSubmit() {
    this.formProcessed = true;
    this.formSubmit = true;
    if (this.posForm.invalid) {
      this.formSubmit = false;
      console.log(this.posForm.value);
      return;
    }


    let transformedData = this.posForm.controls['items'].value;
    let items = JSON.stringify(transformedData);

    Object.keys(this.posForm.controls).forEach(key => {
      const control = this.posForm.get(key);
      if (control && key!='items' && key!='invoice_image') {
        this.formData.append(key, control.value);
      }
    });

    this.formData.append('items', items);

    if (this.isEditMode) {
      this.userService.updatePOS(this.posID, this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Stock was updated successfully', 'success');
            this.router.navigate(['/user/stock']);
            this.formSubmit = false;
            this.posForm.reset();
          }else{
            this.formSubmit = false;
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while updating stock', 'error');
        }
      );
    } else {
      this.userService.addPOS(this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Stock was added successfully', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.posForm.reset();
            this.router.navigate(['/user/stock']);
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.formSubmit = false;
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while adding stock', 'error');
        }
      );
    }
  }

}
