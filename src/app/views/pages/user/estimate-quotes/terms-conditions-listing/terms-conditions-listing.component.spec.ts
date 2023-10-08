import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsListingComponent } from './terms-conditions-listing.component';

describe('TermsConditionsListingComponent', () => {
  let component: TermsConditionsListingComponent;
  let fixture: ComponentFixture<TermsConditionsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
