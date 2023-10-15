import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstimateComponent } from './view-estimate.component';

describe('ViewEstimateComponent', () => {
  let component: ViewEstimateComponent;
  let fixture: ComponentFixture<ViewEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
