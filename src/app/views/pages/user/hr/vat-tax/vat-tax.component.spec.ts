import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatTaxComponent } from './vat-tax.component';

describe('VatTaxComponent', () => {
  let component: VatTaxComponent;
  let fixture: ComponentFixture<VatTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
