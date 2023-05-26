import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleNewsComponent } from './user-single-news.component';

describe('UserSingleNewsComponent', () => {
  let component: UserSingleNewsComponent;
  let fixture: ComponentFixture<UserSingleNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
