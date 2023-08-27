import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeWithdrawComponent } from './make-withdraw.component';

describe('MakeWithdrawComponent', () => {
  let component: MakeWithdrawComponent;
  let fixture: ComponentFixture<MakeWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
