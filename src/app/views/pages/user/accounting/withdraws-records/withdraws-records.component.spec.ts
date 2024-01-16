import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawsRecordsComponent } from './withdraws-records.component';

describe('WithdrawsRecordsComponent', () => {
  let component: WithdrawsRecordsComponent;
  let fixture: ComponentFixture<WithdrawsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawsRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
