import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCalenderComponent } from './add-user-calender.component';

describe('AddUserCalenderComponent', () => {
  let component: AddUserCalenderComponent;
  let fixture: ComponentFixture<AddUserCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
