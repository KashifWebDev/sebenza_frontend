import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCategoryComponent } from './terms-category.component';

describe('TermsCategoryComponent', () => {
  let component: TermsCategoryComponent;
  let fixture: ComponentFixture<TermsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
