import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSingleOrderComponent } from './users-single-order.component';

describe('UsersSingleOrderComponent', () => {
  let component: UsersSingleOrderComponent;
  let fixture: ComponentFixture<UsersSingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSingleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
