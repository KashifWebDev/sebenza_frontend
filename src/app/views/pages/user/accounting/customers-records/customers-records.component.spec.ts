import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRecordsComponent } from './customers-records.component';

describe('CustomersRecordsComponent', () => {
  let component: CustomersRecordsComponent;
  let fixture: ComponentFixture<CustomersRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
