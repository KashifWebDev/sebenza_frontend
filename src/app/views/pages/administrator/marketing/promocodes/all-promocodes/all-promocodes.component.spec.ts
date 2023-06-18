import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPromocodesComponent } from './all-promocodes.component';

describe('AllPromocodesComponent', () => {
  let component: AllPromocodesComponent;
  let fixture: ComponentFixture<AllPromocodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPromocodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPromocodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
