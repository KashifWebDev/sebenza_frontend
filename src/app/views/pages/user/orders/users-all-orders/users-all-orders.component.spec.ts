import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAllOrdersComponent } from './users-all-orders.component';

describe('UsersAllOrdersComponent', () => {
  let component: UsersAllOrdersComponent;
  let fixture: ComponentFixture<UsersAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAllOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
