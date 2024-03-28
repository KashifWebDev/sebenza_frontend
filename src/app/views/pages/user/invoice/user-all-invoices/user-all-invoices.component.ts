import {Component, OnInit, TemplateRef} from '@angular/core';
import {invoice} from "../../../../../core/interfaces/interfaces";
import {UserService} from "../../user.service";
import {AuthService} from "../../../auth/auth.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {AppService} from "../../../../../app.service";

@Component({
  selector: 'app-user-all-invoices',
  templateUrl: './user-all-invoices.component.html',
  styleUrls: ['./user-all-invoices.component.scss']
})
export class UserAllInvoicesComponent implements OnInit {

  invoices: invoice[] = [];
  ColumnMode = ColumnMode;
  deleteLoading: boolean = false;
  filteredData: invoice[] = [...this.invoices];
  searchText = '';
  switch: number = 1;
  outstanding: number = 0;
  overDue: number = 0;
  draft: number = 0;
  username: string = '';
  currentInvoice: invoice;
  sendEmailForm: FormGroup;
  btnLoading: boolean
  modalReference: NgbModalRef;

  constructor(private userService: UserService, private modalService: NgbModal,
              private authService: AuthService, private appService: AppService) { }


  openBasicModal(content: TemplateRef<any>, invoiceID: number) {
    this.currentInvoice = this.invoices.filter(invoice => invoice.id == invoiceID)[0];
    this.modalReference = this.modalService.open(content, {});
  }

  ngOnInit(): void {
    this.username = this.authService.getLoggedInUser()!.first_name +' '+ this.authService.getLoggedInUser()!.last_name;

    this.userService.getInvoices().subscribe(response => {
      if (response.status && response.data) {
        this.invoices = response.data.invoices;
        this.filterData();

        const draftInvoices = this.invoices.filter(invoice => !invoice.email_sent)
        const outstandingInvoices = this.invoices.filter(invoice => invoice.email_sent)

        draftInvoices.forEach((invoice: invoice) => {
          this.draft += +invoice.payable_amount;
        })
        outstandingInvoices.forEach((invoice: invoice) => {
          this.outstanding += +invoice.payable_amount;
        })
      }
    });
  }

  selectPill(section: number) {
    this.switch = section;
    const pillSections = document.querySelectorAll('.pill-section');
    pillSections.forEach(section => {
      section.classList.remove('selected');
    });

    const selectedPill = document.querySelector(`.pill-section:nth-child(${section})`);
    selectedPill?.classList.add('selected'); // Added optional chaining here
  }


  filterData() {
    if (this.searchText.trim() !== '') {
      const searchTerms = this.searchText.toLowerCase().split(' ');

      this.filteredData = this.invoices.filter(item => {
        const itemValues = Object.values(item).map(value => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase();
          }
          return '';
        });
        return searchTerms.every(term => itemValues.some(value => value.includes(term)));
      });
    } else {
      this.filteredData = [...this.invoices];
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

}
