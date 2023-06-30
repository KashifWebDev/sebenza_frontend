import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminCalenderComponent } from './view-admin-calender.component';

describe('ViewAdminCalenderComponent', () => {
  let component: ViewAdminCalenderComponent;
  let fixture: ComponentFixture<ViewAdminCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
