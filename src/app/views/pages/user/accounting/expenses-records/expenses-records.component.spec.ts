import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesRecordsComponent } from './expenses-records.component';

describe('ExpensesRecordsComponent', () => {
  let component: ExpensesRecordsComponent;
  let fixture: ComponentFixture<ExpensesRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
