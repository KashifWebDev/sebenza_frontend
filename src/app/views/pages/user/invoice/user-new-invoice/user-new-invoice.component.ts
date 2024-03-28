import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {invoice, User} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-user-new-invoice',
  templateUrl: './user-new-invoice.component.html',
  styleUrls: ['./user-new-invoice.component.scss']
})
export class UserNewInvoiceComponent implements OnInit {

  user: User;
  invoice: invoice;
  invoiceID: number;
  loading: boolean = false;


  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  btnLoading: boolean = false;
  newInvoice: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;

  @ViewChild('fileInput') fileInputRef: ElementRef;
  selectedImage: any; // Variable to store the selected image
  currentDate = new Date();
  totalPrice: number = 0;

  triggerUpload() {
    // Click the file input element
    this.fileInputRef.nativeElement.click();
  }

  handleFileInput(event: any) {
    // Handle file input change event here
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check if the file is an image
      if (file.type.startsWith('image')) {
        // Read the selected image file as data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          // Update the selectedImage variable with the data URL of the selected image
          this.selectedImage = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Handle if the selected file is not an image
        console.log('Selected file is not an image.');
      }
    }
  }

  confirmSaveModal(){
    this.btnLoading = true;
    setTimeout( () => {
      this.btnLoading = false;
      this.appService.swalFire('Invoice was sent to the user', 'success');
    }, 2000 );



    // let formData: FormData = new FormData();
    // formData.append('frequecy_name', this.sendEmailForm.controls['freqName'].value);
    //
    // this.userService.addNewFrequency(formData).subscribe(
    //   data => {
    //     if(data.status){
    //       this.sendEmailForm.reset();
    //       this.appService.swalFire('Pay frequency added Successfully', 'success');
    //       this.modalReference.close();
    //     }else{
    //       this.appService.swalFire(data.message, 'error');
    //     }
    //     this.btnLoading = false;
    //   },
    //   (error) => {
    //     this.btnLoading = false;
    //     this.appService.swalFire('An error occurred while performing action', 'error');
    //   }
    // );
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalReference = this.modalService.open(content, {});
  }
  calculateTotalPrice(): void {
    let totalPrice = 0;
    const items = this.newInvoice.get('items') as FormArray;
    items.controls.forEach(control => {
      const item = control.value;
      totalPrice += item.rate * item.qty;
    });
    // Update total price in the form
    this.totalPrice = totalPrice;
  }



  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private modalService: NgbModal,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.newInvoice = this.formBuilder.group({
      fullname: ['', Validators.required],
      address: ['', Validators.required],
      items: this.formBuilder.array([])
    });

    // Subscribe to changes in items to recalculate total price
    this.newInvoice.get('items')?.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });

    this.user = this.authService.currentUser;
    this.loading = true;
    this.route.params.subscribe(params => {
      this.invoiceID = 10;
      this.getInvoice();
    });

    render(
      {
        id: "#payments",
        currency: "USD",
        value: "100.00",
        onApprove: (details: any) => {
          const formData = new FormData();
          formData.append('invoiceID', this.invoiceID.toString());
          formData.append('successResponse', JSON.stringify(details));
          this.userService.paymentSuccess(formData).subscribe(
            response => {
              if(response.status){
                this.appService.swalFire(response.message, 'success');
                this.router.navigate(['../']);
              }
              this.appService.swalFire(response.message, 'error');
            }
          );
        }
      }
    );

  }

  get items() {
    return this.newInvoice.get('items') as FormArray;
  }
  addItem() {
    this.items.push(this.formBuilder.group({
      company: ['', Validators.required],
      name: ['', Validators.required],
      rate: ['', Validators.required],
      qty: ['', Validators.required]
    }));
  }
  // Method to remove an item from the form array by index
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  getInvoice(){
    this.userService.getInvoiceByID(this.invoiceID).subscribe(
      (res) => {
        if(res.status && res.data?.invoices){
          this.invoice = res.data.invoices;
          this.loading = false;
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching Invoice details!', 'error');
      }
    );
  }

  calculateTotal(total: string, discount: string): number{
    return parseFloat(total)-parseFloat(discount);
  }

  openModal(){
    this.modalReference = this.modalService.open(this.deleteModal, {});
  }

  get form() {
    return this.newInvoice.controls;
  }

  confirmModal(){
    this.btnLoading = true;
    this.formProcessed = true;
    if(this.newInvoice.invalid){
      this.btnLoading = false;
      return;
    }
    const formData = new FormData();
    formData.append(`invoiceID`, this.invoice.invoiceID.toString());
    formData.append(`promocode`, this.newInvoice.value['voucher']);
    this.userService.applyVoucher(formData).subscribe(
      data => {
        if(data.status){
          this.appService.swalFire('Voucher was applied successfully!', 'success');
          this.getInvoice();
          this.modalReference.close();
        }else{
          this.appService.swalFire(data.message, 'error');
        }
        this.btnLoading = false;
      },
      (error) => {
        this.btnLoading = false;
        this.appService.swalFire('An error occurred while applying for discount!', 'error');
      }
    );
  }
}
