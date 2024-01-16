import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRecordsComponent } from './meeting-records.component';

describe('MeetingRecordsComponent', () => {
  let component: MeetingRecordsComponent;
  let fixture: ComponentFixture<MeetingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
