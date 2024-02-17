import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCaseComponent } from './add-new-case.component';

describe('AddNewCaseComponent', () => {
  let component: AddNewCaseComponent;
  let fixture: ComponentFixture<AddNewCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
