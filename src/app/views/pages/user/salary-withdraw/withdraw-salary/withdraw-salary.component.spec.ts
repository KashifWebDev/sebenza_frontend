import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawSalaryComponent } from './withdraw-salary.component';

describe('WithdrawSalaryComponent', () => {
  let component: WithdrawSalaryComponent;
  let fixture: ComponentFixture<WithdrawSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
