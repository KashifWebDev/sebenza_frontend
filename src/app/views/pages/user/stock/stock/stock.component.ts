import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stocksForm: FormGroup;
  isEditMode: boolean = false;
  stockID: number;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  formData: FormData = new FormData();
  loading: boolean = false;
  fileToUpload: File;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.stockID = +params['edit'];
      this.isEditMode = !!this.stockID;
      this.initializeForm();
      if (this.isEditMode) {
        this.loading = true;
        // Fetch user details by userId or use the provided user data
        const user = this.userService.getSingleStock(this.stockID).subscribe(
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
  }

  get form() {
    return this.stocksForm.controls;
  }

  initializeForm() {
    // Initialize the form with empty fields
    this.stocksForm = this.formBuilder.group({
      sender_name: ['', Validators.required],
      sender_cell_number: ['', Validators.required],
      sender_email: ['', Validators.required],
      sender_address: ['', Validators.required],
      receiver_name: ['', Validators.required],
      receiver_cell_number: ['', Validators.required],
      receiver_email: ['', Validators.required],
      receiver_address: ['', Validators.required],
      reference: ['', Validators.required],
      code: ['', Validators.required],
      item_value: ['', Validators.required],
      discount: ['', Validators.required],
      total_amount: ['', Validators.required],
      paid_amount: ['', Validators.required],
      due_amount: ['', Validators.required],
      invoice_image: ['', Validators.required],
      items: this.formBuilder.array([]),
    });
    this.addItemToFormArray();
  }

  addItemToFormArray(item?: any) {
    const itemFormGroup = this.formBuilder.group({
      stockitem_id: [item ? item.itemName : ''],
      quantity: [item ? item.quantity : ''],
      description: [item ? item.itemPrice : ''],
      color: [item ? item.color : '#727cf5'],
      size: [item ? item.size : null],
      weight: [item ? item.weight : null],
    });

    (this.stocksForm.get('items') as FormArray).push(itemFormGroup);
  }

  get formControls(){
    return this.stocksForm.controls['items'] as FormArray;
  }

  populateForm(form: any)  {
    this.stocksForm.patchValue({
      sender_name: form.sender_name,
      sender_cell_number: form.sender_cell_number,
      sender_email: form.sender_email,
      sender_address: form.sender_address,
      receiver_name: form.receiver_name,
      receiver_cell_number: form.receiver_cell_number,
      receiver_email: form.receiver_email,
      receiver_address: form.receiver_address,
      reference: form.reference,
      code: form.code,
      discount: form.discount,
      total_amount: form.total_amount,
      paid_amount: form.paid_amount,
      due_amount: form.due_amount,
      invoice_image: form.invoice_image,
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
    if (this.stocksForm.invalid) {
      this.formSubmit = false;
      return;
    }


    let transformedData = this.stocksForm.controls['items'].value;
    let items = JSON.stringify(transformedData);

    Object.keys(this.stocksForm.controls).forEach(key => {
      const control = this.stocksForm.get(key);
      if (control && key!='items' && key!='invoice_image') {
        this.formData.append(key, control.value);
      }
    });

    this.formData.append('items', items);
    if(this.fileToUpload) this.formData.append('invoice_image', this.fileToUpload);

    if (this.isEditMode) {
      this.userService.updateStock(this.stockID, this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Quote was updated successfully', 'success');
            this.router.navigate(['/user/quotes/estimate-settings']);
            this.formSubmit = false;
            this.stocksForm.reset();
          }else{
            this.formSubmit = false;
            this.appService.swalFire(data.message, 'error');
          }
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while updating quote', 'error');
        }
      );
    } else {
      this.userService.addStock(this.formData).subscribe(
        (data) => {
          if(data.status){
            this.appService.swalFire('Quote was added successfully', 'success');
            this.formProcessed = false;
            this.formSubmit = false;
            this.stocksForm.reset();
            this.router.navigate(['/user/quotes/estimate-settings']);
          }else{
            this.appService.swalFire(data.message, 'error');
          }
          this.formSubmit = false;
        },
        (error) => {
          this.formSubmit = false;
          this.appService.swalFire('An error was occurred while creating quote', 'error');
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
