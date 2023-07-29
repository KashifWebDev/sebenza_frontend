import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllInvoicesComponent } from './user-all-invoices.component';

describe('UserAllInvoicesComponent', () => {
  let component: UserAllInvoicesComponent;
  let fixture: ComponentFixture<UserAllInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAllInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
