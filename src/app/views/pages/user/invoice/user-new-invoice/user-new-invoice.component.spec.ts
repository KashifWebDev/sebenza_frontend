import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewInvoiceComponent } from './user-new-invoice.component';

describe('UserNewInvoiceComponent', () => {
  let component: UserNewInvoiceComponent;
  let fixture: ComponentFixture<UserNewInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
