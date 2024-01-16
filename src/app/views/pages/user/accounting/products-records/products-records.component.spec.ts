import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRecordsComponent } from './products-records.component';

describe('ProductsRecordsComponent', () => {
  let component: ProductsRecordsComponent;
  let fixture: ComponentFixture<ProductsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
