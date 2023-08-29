import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawRequestSingleComponent } from './withdraw-request-single.component';

describe('WithdrawRequestSingleComponent', () => {
  let component: WithdrawRequestSingleComponent;
  let fixture: ComponentFixture<WithdrawRequestSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawRequestSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawRequestSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
