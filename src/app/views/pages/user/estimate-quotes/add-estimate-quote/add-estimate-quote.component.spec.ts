import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstimateQuoteComponent } from './add-estimate-quote.component';

describe('AddEstimateQuoteComponent', () => {
  let component: AddEstimateQuoteComponent;
  let fixture: ComponentFixture<AddEstimateQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEstimateQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEstimateQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
