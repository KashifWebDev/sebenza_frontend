import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleInvoiceComponent } from './admin-single-invoice.component';

describe('AdminSingleInvoiceComponent', () => {
  let component: AdminSingleInvoiceComponent;
  let fixture: ComponentFixture<AdminSingleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSingleInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
