import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllNewsComponent } from './list-all-news.component';

describe('ListAllNewsComponent', () => {
  let component: ListAllNewsComponent;
  let fixture: ComponentFixture<ListAllNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
