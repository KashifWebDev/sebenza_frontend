import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksRecordsComponent } from './tasks-records.component';

describe('TasksRecordsComponent', () => {
  let component: TasksRecordsComponent;
  let fixture: ComponentFixture<TasksRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
