import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccountTypesComponent } from './all-account-types.component';

describe('AllAccountTypesComponent', () => {
  let component: AllAccountTypesComponent;
  let fixture: ComponentFixture<AllAccountTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAccountTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAccountTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
