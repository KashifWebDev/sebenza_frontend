import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminCalenderComponent } from './add-admin-calender.component';

describe('AddAdminCalenderComponent', () => {
  let component: AddAdminCalenderComponent;
  let fixture: ComponentFixture<AddAdminCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
