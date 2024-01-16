import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesRecordsComponent } from './estimates-records.component';

describe('EstimatesRecordsComponent', () => {
  let component: EstimatesRecordsComponent;
  let fixture: ComponentFixture<EstimatesRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatesRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
