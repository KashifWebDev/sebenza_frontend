import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFrequencyComponent } from './pay-frequency.component';

describe('PayFrequencyComponent', () => {
  let component: PayFrequencyComponent;
  let fixture: ComponentFixture<PayFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
