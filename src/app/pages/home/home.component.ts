import { Component,ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { error } from 'console';
import { sign } from 'crypto';
import { IApiResponse, Icourse, IcourseVideos } from '../../model/master.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  masterSrv=inject(MasterService)
  courseList=signal<Icourse[]>([])
  courseVideos:IcourseVideos[]=[]
  @ViewChild('courseModal') modal: ElementRef | undefined;
  ngOnInit(): void {
    this.loadCourses();
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
