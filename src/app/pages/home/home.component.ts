import { Component,ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { error } from 'console';
import { sign } from 'crypto';
import { IApiResponse, Icourse, IcourseVideos, IEnrollment, User } from '../../model/master.model';
import { SlicePipe } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SlicePipe,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  masterSrv=inject(MasterService)
  courseList=signal<Icourse[]>([])
  courseVideos:IcourseVideos[]=[]
  storageService = inject(StorageService);
  @ViewChild('courseModal') modal: ElementRef | undefined;

  loggedUserData:User=new User;
  ngOnInit(): void {
        const localData = this.storageService.getItem('learningUser');
        if (localData != null) {
          const parseData = JSON.parse(localData);
          this.loggedUserData = parseData;
        }
    this.loadCourses();
  }
  onEnroll(courseId:number){
    if(this.loggedUserData.userId==0){
      alert("Please Login First To Enroll");
    }
    else{
      const enrolObj:IEnrollment={
        courseId:courseId,
        enrolledDate:new Date(),
        enrollmentId:0,
        userId:this.loggedUserData.userId,
        isCompleted:false
      };
      this.masterSrv.onEnrollment(enrolObj).subscribe((res: IApiResponse) => {
        if (res.result) {
          alert('Enrollment Success');
        } else {
          alert(res.message);
        }
      });
    }
  }
  openModal(courseId:number){
    if(this.modal){
      this.modal.nativeElement.style.display='block';
      this.getCourseVideos(courseId)
    }
  }
  loadCourses(){
    this.masterSrv.getAllCourses().subscribe((res:IApiResponse)=>{
      this.courseList.set(res.data)
    },error=>{
      
    })
  }
  getCourseVideos(courseId:number){
    this.masterSrv.getCourseVideosbyCourseId(courseId).subscribe((res:IApiResponse)=>{
      this.courseVideos=(res.data)
    },error=>{
      
    })
  }
}
