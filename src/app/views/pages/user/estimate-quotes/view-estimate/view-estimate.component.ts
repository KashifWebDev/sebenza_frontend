import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../../../core/interfaces/interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {AppService} from "../../../../../app.service";
import {AuthService} from "../../../auth/auth.service";
import {render} from "creditcardpayments/creditCardPayments";

@Component({
  selector: 'app-view-estimate',
  templateUrl: './view-estimate.component.html',
  styleUrls: ['./view-estimate.component.scss']
})
export class ViewEstimateComponent implements OnInit {

  user: User;
  invoice: any;
  invoiceID: number;
  loading: boolean = false;


  modalReference: NgbModalRef;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any> | NgbModalRef;
  btnLoading: boolean = false;
  addNewOrderForm: FormGroup;
  formSubmit: boolean = false;
  formProcessed: boolean = false;
  loadingBtn: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private modalService: NgbModal,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.addNewOrderForm = this.formBuilder.group({
      voucher: ['', Validators.required]
    });

    this.user = this.authService.currentUser;
    this.loading = true;
    this.route.params.subscribe(params => {
      this.invoiceID = parseInt(params['id']);
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

  getInvoice(){
    this.userService.getQuoteDetails(this.invoiceID).subscribe(
      (res) => {
        if(res.status && res.data?.estimatequotes){
          this.invoice = res.data.estimatequotes;
          this.loading = false;
        }else{
          this.appService.swalFire(res.message, 'error');
        }
      },
      (error) => {
        this.appService.swalFire('An error was occurred while fetching quote details!', 'error');
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
    return this.addNewOrderForm.controls;
  }

  confirmModal(){
    this.btnLoading = true;
    this.formProcessed = true;
    if(this.addNewOrderForm.invalid){
      this.btnLoading = false;
      return;
    }
    const formData = new FormData();
    formData.append(`invoiceID`, this.invoice.invoiceID.toString());
    formData.append(`promocode`, this.addNewOrderForm.value['voucher']);
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
