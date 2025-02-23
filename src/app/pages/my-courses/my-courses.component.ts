import { Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { courseList } from './my-courses.model';
import  {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import {faStar} from  '@fortawesome/free-solid-svg-icons'
import { RatingComponent } from '../rating/rating.component';
@Component({
  selector: 'app-my-courses',
  imports: [FormsModule,CommonModule,FontAwesomeModule,RatingComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})

export class MyCoursesComponent {
  mycourses:courseList[]=[
    {
      title:" INTRODUCTION TO WEB DEVELOPMENT",
      image:"../../../assets/html.jpg",
      rating:4.5
    },
    
    {
      title:" JAVASCRIPT & ITS FRAMEWORKS",
      image:"../../../assets/jquery.jpg",
      rating:4.5
    },
    {
      title:" INTRODUCTION TO ANGULAR 19",
      image:"../../../assets/angular.jpg",
      rating:3
    },
    {
      title:" INTRODUCTION TO App Development",
      image:"../../../assets/html.jpg",
      rating:5
    },
    {
      title:" INTRODUCTION TO Laravel 11",
      image:"../../../assets/laravel.jpg",
      rating:4
    },
    {
      title:" C sharp beginner to advanced course",
      image:"../../../assets/csharp.jpg",
      rating:3
    },
    {
      title:"full stack using Dotnet",
      image:"../../../assets/html.jpg",
      rating:4
    },
    {
      title:"Core JAVA ",
      image:"../../../assets/java.jpg",
      rating:4
    },
    {
      title:"JDBC,SPRINGBOOT and servlets",
      image:"../../../assets/java.jpg",
      rating:4
    },
    {
      title:"beginner to advanced level of development using API",
      image:"../../../assets/html.jpg",
      rating:2
    },
    {
      title:"Exploring foundation of typescript and ES6",
      image:"../../../assets/ts.jpg",
      rating:3
    },
    {
      title:"relational database mangement system",
      image:"../../../assets/java.jpg",
      rating:2.5
    }
  ]
  filter=faFilter;
  star=faStar;

  course:string="";// forsearch bar
  selecteditem:string="";// filter option selected
  
  searchedCourses:courseList[]=this.mycourses;
  searchrating:courseList[]=[];
  
 
  filterRecords(){
    this.searchedCourses=this.mycourses.filter(record=>
      {
      const matchquery=this.course?this.matchsearchquery(record):true;
      const filtermatch=this.selecteditem?this.matchesfilter(record):true;
      return matchquery && filtermatch;
      })
    };
  
  matchsearchquery(record:any):boolean{
    const query=this.course.toLocaleLowerCase();
    return record.title.toLocaleLowerCase().includes(query)
    ;

  }
  matchesfilter(record:any):boolean{
    
        return record.rating.toString()===this.selecteditem;
      
 
  }
  // get searchCourse():string{
  //   return this.course;
  // }
  
  // set searchCourse(value:string){
  //   this.course = value;
  //   this.searchedCourses = this.searchCourse?
  //   this.performSearch(this.searchCourse):this.mycourses; //aven
   
  // }
  
  
  // performSearch(searchby:string):courseList[]{ //aven
  //   searchby=searchby.toLocaleLowerCase();
  //   return this.mycourses.filter((c:courseList)=>
  //   c.title.toLocaleLowerCase().indexOf(searchby)!==-1);
   
  // }
  
}