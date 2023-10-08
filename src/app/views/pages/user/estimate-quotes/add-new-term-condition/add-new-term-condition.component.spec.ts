import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTermConditionComponent } from './add-new-term-condition.component';

describe('AddNewTermConditionComponent', () => {
  let component: AddNewTermConditionComponent;
  let fixture: ComponentFixture<AddNewTermConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTermConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTermConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
