import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBanksComponent } from './my-banks.component';

describe('MyBanksComponent', () => {
  let component: MyBanksComponent;
  let fixture: ComponentFixture<MyBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
