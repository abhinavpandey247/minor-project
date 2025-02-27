import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesComponent } from './my-courses.component';

describe('MyCoursesComponent', () => {
  let component: MyCoursesComponent;
  let fixture: ComponentFixture<MyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter courses based on search query', () => {
    component.course = 'angular';
    component.filterRecords();
    expect(component.searchedCourses.length).toBe(1);
    expect(component.searchedCourses[0].title).toContain('ANGULAR');
  });

  it('should filter courses based on selected rating', () => {
    component.selecteditem = '4.5';
    component.filterRecords();
    expect(component.searchedCourses.length).toBe(2);
    component.searchedCourses.forEach(course => {
      expect(course.rating).toBe(4.5);
    });
  });
});
