import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserCalenderComponent } from './view-user-calender.component';

describe('ViewUserCalenderComponent', () => {
  let component: ViewUserCalenderComponent;
  let fixture: ComponentFixture<ViewUserCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
