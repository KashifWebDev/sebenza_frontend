import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleOrderComponent } from './admin-single-order.component';

describe('AdminSingleOrderComponent', () => {
  let component: AdminSingleOrderComponent;
  let fixture: ComponentFixture<AdminSingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSingleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
