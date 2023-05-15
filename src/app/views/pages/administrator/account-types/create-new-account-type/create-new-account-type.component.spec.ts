import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAccountTypeComponent } from './create-new-account-type.component';

describe('CreateNewAccountTypeComponent', () => {
  let component: CreateNewAccountTypeComponent;
  let fixture: ComponentFixture<CreateNewAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAccountTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
