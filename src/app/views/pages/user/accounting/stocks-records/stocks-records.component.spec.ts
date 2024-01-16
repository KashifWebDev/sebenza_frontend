import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksRecordsComponent } from './stocks-records.component';

describe('StocksRecordsComponent', () => {
  let component: StocksRecordsComponent;
  let fixture: ComponentFixture<StocksRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
