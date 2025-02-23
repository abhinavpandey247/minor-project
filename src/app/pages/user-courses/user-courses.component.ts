import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IEnrollmentCourse, User } from '../../model/master.model';
import { MasterService } from '../../services/master.service';
import { IApiResponse } from '../../model/master.model';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-courses',
  imports: [SlicePipe],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit {
  storageService = inject(StorageService);
  
    loggedUserData: User = new User();
    masterSrv=inject(MasterService)
    courseList:IEnrollmentCourse[]=[]
    router=inject(Router)
    activatedRoute=inject(ActivatedRoute);
    constructor() {
      const localData = this.storageService.getItem('learningUser');
      if (localData != null) {
        const parseData = JSON.parse(localData);
        this.loggedUserData = parseData;
      }
    }

    ngOnInit(): void {
      this.getEnrollmentByUserId()
    }
    navigatingToCourse(id:number){
      this.router.navigate(['coursedetail',id])
    }

    getEnrollmentByUserId(){
      this.masterSrv.getEnrolledCourseByUserId(this.loggedUserData.userId).subscribe((res:IApiResponse)=>{
        this.courseList=res.data;
      })
    }

}
