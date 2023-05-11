import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {role} from "../../../../../core/interfaces/interfaces";
import {AdministratorService} from "../../administrator.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataTable} from "simple-datatables";

@Component({
  selector: 'app-list-all-roles',
  templateUrl: './list-all-roles.component.html',
  styleUrls: ['./list-all-roles.component.scss']
})
export class ListAllRolesComponent implements OnInit, AfterViewInit {

  @ViewChild('dataTable') dataTable!: ElementRef;
  basicModalCloseResult: string = '';
  userRoles: role[] | undefined;
  @ViewChild('basicModal', { static: true }) deleteModal: TemplateRef<any>;

  constructor(private adminService: AdministratorService, private modalService: NgbModal,
              private renderer: Renderer2) { }


  ngOnInit(): void {

    this.adminService.getAllRoles().subscribe(response => {
      if (response.status) {
        this.userRoles = response.data?.roles;
        setTimeout(() => {
          const dataTable = new DataTable("#dataTableExample");
          // Access the pagination element

          dataTable.on('page', () => {
            // Execute your function here
            this.changeStyle();
            console.log('PAGINATION CHAngE');
          });

          this.changeStyle();
          console.log('Hey');
        }, 1000)
      }
    });
  }

  ngAfterViewInit() {
    this.listenToPaginationClick();
  }

  listenToPaginationClick() {
    setTimeout(() => {
      const paginationElement = document.querySelector('.datatable-pagination');
      const selectRange = document.querySelector('.datatable-selector');
      if (paginationElement || selectRange) {
        console.log('Magic');
        this.renderer.listen(paginationElement, 'click', () => {
          setTimeout(() => {
            this.changeStyle();
          }, 10);
        });
        this.renderer.listen(selectRange, 'click', () => {
          console.log("SELECT");
          setTimeout(() => {
            this.changeStyle();
          }, 10);
        });
      }
    }, 2000);
  }

  changeStyle() {
    const searchBar = document.querySelectorAll('.datatable-input') as NodeListOf<HTMLElement>;
    searchBar.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'background-color', '#0c1427');
      this.renderer.setStyle(element, 'color', '#d0d6e1');
      this.renderer.setStyle(element, 'line-height', '1.5');
      this.renderer.setStyle(element, 'border', '1px solid #172340');
    });

    const elements = document.querySelectorAll('.datatable-selector') as NodeListOf<HTMLElement>;
    elements.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'background-color', '#0c1427');
      this.renderer.setStyle(element, 'color', '#d0d6e1');
    });

    const active = document.querySelectorAll('li.datatable-pagination-list-item > a') as NodeListOf<HTMLElement>;
    const active_a = document.querySelectorAll('li.datatable-pagination-list-item.datatable-active > a') as NodeListOf<HTMLElement>;

    active.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'color', '#515acc');
      this.renderer.setStyle(element, 'background-color', '#18284e');
      this.renderer.setStyle(element, 'border-color', '#18284e');
    });
    active_a.forEach((element: HTMLElement) => {
      this.renderer.setStyle(element, 'color', '#fff');
      this.renderer.setStyle(element, 'background-color', '#6571ff');
      this.renderer.setStyle(element, 'border-color', '#6571ff');
    });
  }

  deleteRole(id: number) {
    console.log(id);
    this.modalService.open(this.deleteModal, {});
  }
}
