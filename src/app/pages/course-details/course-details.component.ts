import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IApiResponse, IcourseVideos, ICourseWithVideos, User, userlist } from '../../model/master.model';
import { MasterService } from '../../services/master.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  
}
