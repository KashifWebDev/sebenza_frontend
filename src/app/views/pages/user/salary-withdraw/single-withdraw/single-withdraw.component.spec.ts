import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWithdrawComponent } from './single-withdraw.component';

describe('SingleWithdrawComponent', () => {
  let component: SingleWithdrawComponent;
  let fixture: ComponentFixture<SingleWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
