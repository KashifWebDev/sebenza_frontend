import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleSalaryComponent } from './view-single-salary.component';

describe('ViewSingleSalaryComponent', () => {
  let component: ViewSingleSalaryComponent;
  let fixture: ComponentFixture<ViewSingleSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
