import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWhatsappComponent } from './add-whatsapp.component';

describe('AddWhatsappComponent', () => {
  let component: AddWhatsappComponent;
  let fixture: ComponentFixture<AddWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
