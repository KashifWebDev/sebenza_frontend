import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRecordsComponent } from './projects-records.component';

describe('ProjectsRecordsComponent', () => {
  let component: ProjectsRecordsComponent;
  let fixture: ComponentFixture<ProjectsRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
