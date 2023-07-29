import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleInvoiceComponent } from './user-single-invoice.component';

describe('UserSingleInvoiceComponent', () => {
  let component: UserSingleInvoiceComponent;
  let fixture: ComponentFixture<UserSingleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
