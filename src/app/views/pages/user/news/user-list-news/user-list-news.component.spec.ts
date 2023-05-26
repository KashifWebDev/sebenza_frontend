import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListNewsComponent } from './user-list-news.component';

describe('UserListNewsComponent', () => {
  let component: UserListNewsComponent;
  let fixture: ComponentFixture<UserListNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
