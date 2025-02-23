import { Component,OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Icourse,IApiResponse } from '../../model/master.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  course: Icourse | undefined;
  constructor(
    private route: ActivatedRoute,
    private masterSrv: MasterService // Inject the service
  ) { }
 
  ngOnInit(): void {
    const courseId = +this.route.snapshot.paramMap.get('id')!; // Get course ID from route
    this.getCourseDetails(courseId); // Fetch course details
  }
 
  getCourseDetails(courseId: number): void {
    this.masterSrv.getAllCourses().subscribe((res: IApiResponse) => {
      this.course = res.data.find((course: Icourse) => course.courseId === courseId);
    }, error => {
      // Handle error
    });
  }
}
 