import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {termsCondition} from "../../../../../core/interfaces/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-add-new-case',
  templateUrl: './add-new-case.component.html',
  styleUrls: ['./add-new-case.component.scss']
})
export class AddNewCaseComponent implements OnInit {
  quoteForm: FormGroup;
  isEditMode: boolean = false;
  quoteID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  termsConditions: termsCondition[];
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ],
    },
  }
  fileToUpload: File;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getTermsConditions().subscribe(
      res => {
        if(res.status && res.data?.termsconditions){
          this.termsConditions = res.data.termsconditions;
        }
      }
    )

    this.route.queryParams.subscribe(params => {
      this.quoteID = +params['edit'];
      this.isEditMode = !!this.quoteID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        // Fetch user details by userId or use the provided user data
        const user = this.userService.getQuoteDetails(this.quoteID).subscribe(
          (res) => {
            if(res.status && res.data?.estimatequotes){
              this.loading = false;
              this.populateForm(res.data.estimatequotes);
            }else{
              this.appService.swalFire(res.message, 'error');
            }
          },
          (error) => {
            this.appService.swalFire('An error was occurred while fetching cases details!', 'error');
          }
        );
      }
    });
  }

  get form() {
    return this.quoteForm.controls;
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.quoteForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
      customer_phone: ['', Validators.required],
      customer_email: ['', Validators.required],
      customer_country: ['', [Validators.required]],
      shipping_city: ['', Validators.required],
      shipping_zone: ['', Validators.required],
      shipping_address: ['', Validators.required],
      title: ['', Validators.required],
      description: ['<p>Case Details...</p>', Validators.required],
      notes: ['', Validators.required],
      paymentDate: ['', Validators.required],
      customer_e_signature: [''],
      subTotal: ['', Validators.required],
      discountCharge: ['', Validators.required],
      vat: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required],
      payment_method: ['', Validators.required],
      amount: ['', Validators.required],
      trx_id: ['', Validators.required],
      items: this.formBuilder.array([]),
      termsconditions: ['', Validators.required],
    });
    this.addItemToFormArray();
  }

  addItemToFormArray(item?: any) {
    const itemFormGroup = this.formBuilder.group({
      itemName: [item ? item.itemName : ''],
      quantity: [item ? item.quantity : ''],
      itemPrice: [item ? item.itemPrice : ''],
      color: [item ? item.color : '#727cf5'],
      size: [item ? item.size : null],
      weight: [item ? item.weight : null],
    });

    (this.quoteForm.get('items') as FormArray).push(itemFormGroup);
  }

  get formControls(){
    return this.quoteForm.controls['items'] as FormArray;
  }

  populateForm(form: any) {
    this.quoteForm.patchValue({
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      customer_email: form.customer_email,
      customer_country: form.customer_country,
      shipping_city: form.shipping_city,
      shipping_zone: form.shipping_zone,
      shipping_address: form.shipping_address,
      title: form.title,
      description: form.description,
      notes: form.notes,
      paymentDate: form.paymentDate,
      customer_e_signature: form.customer_e_signature,
      subTotal: form.subTotal,
      discountCharge: form.discountCharge,
      vat: form.vat,
      total: form.total,
      status: form.status,
      payment_method: form.payment_method,
      amount: form.amount,
      trx_id: form.trx_id,
      items: form.items,
      termsconditions: form.termsconditions,
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
    if (this.quoteForm.invalid) {
      this.formSubmit = false;
      return;
    }

    let transformedData = this.quoteForm.controls['termsconditions'].value.map((item: any, index: any) => ({
      terms_id: item.id
    }));
    let termsCondition = JSON.stringify(transformedData);
    transformedData = this.quoteForm.controls['items'].value;
    let items = JSON.stringify(transformedData);
    let dt = this.quoteForm.controls['paymentDate'].value;
    let paymentDate = dt.year+'-'+dt.month+'-'+dt.day;

    this.formData.append('customer_name', this.quoteForm.controls['customer_name'].value);
    this.formData.append('customer_phone', this.quoteForm.controls['customer_phone'].value);
    this.formData.append('customer_email', this.quoteForm.controls['customer_email'].value);
    this.formData.append('customer_country', this.quoteForm.controls['customer_country'].value);
    this.formData.append('shipping_city', this.quoteForm.controls['shipping_city'].value);
    this.formData.append('shipping_zone', this.quoteForm.controls['shipping_zone'].value);
    this.formData.append('shipping_address', this.quoteForm.controls['shipping_address'].value);
    this.formData.append('title', this.quoteForm.controls['title'].value);
    this.formData.append('description', this.quoteForm.controls['description'].value);
    this.formData.append('notes', this.quoteForm.controls['notes'].value);
    this.formData.append('paymentDate', paymentDate);
    this.formData.append('customer_e_signature', this.quoteForm.controls['customer_e_signature'].value);
    this.formData.append('subTotal', this.quoteForm.controls['subTotal'].value);
    this.formData.append('discountCharge', this.quoteForm.controls['discountCharge'].value);
    this.formData.append('vat', this.quoteForm.controls['vat'].value);
    this.formData.append('total', this.quoteForm.controls['total'].value);
    this.formData.append('status', this.quoteForm.controls['status'].value);
    this.formData.append('payment_method', this.quoteForm.controls['payment_method'].value);
    this.formData.append('amount', this.quoteForm.controls['amount'].value);
    this.formData.append('trx_id', this.quoteForm.controls['trx_id'].value);
    this.formData.append('items', items);
    this.formData.append('termsconditions', termsCondition);
    if(this.fileToUpload) this.formData.append('customer_e_signature', this.fileToUpload);

    if (this.isEditMode) {
      this.userService.editQuote(this.formData, this.quoteID).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Case was updated successfully', 'success');
            this.router.navigate(['/user/quotes/estimate-settings']);
            this.formSubmit = false;
            this.quoteForm.reset();
          }else{
            this.formSubmit = false;
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while updating case', 'error');
        }
      );
    } else {
      this.userService.addNewQuote(this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Case was added successfully', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.quoteForm.reset();
            this.router.navigate(['/user/law-firm/cases']);
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.formSubmit = false;
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while creating case', 'error');
        }
      );
    }

    // Clear the form after successful submission
  }


  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileToUpload = fileInput.files[0];
    }
  }
}
