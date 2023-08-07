import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllInvoicesComponent } from './admin-all-invoices.component';

describe('AdminAllInvoicesComponent', () => {
  let component: AdminAllInvoicesComponent;
  let fixture: ComponentFixture<AdminAllInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
