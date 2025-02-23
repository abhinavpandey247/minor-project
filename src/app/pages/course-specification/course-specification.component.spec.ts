import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSpecificationComponent } from './course-specification.component';

describe('CourseSpecificationComponent', () => {
  let component: CourseSpecificationComponent;
  let fixture: ComponentFixture<CourseSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSpecificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
