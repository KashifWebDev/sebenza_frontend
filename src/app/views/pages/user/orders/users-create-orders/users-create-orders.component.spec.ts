import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateOrdersComponent } from './users-create-orders.component';

describe('UsersCreateOrdersComponent', () => {
  let component: UsersCreateOrdersComponent;
  let fixture: ComponentFixture<UsersCreateOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCreateOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
