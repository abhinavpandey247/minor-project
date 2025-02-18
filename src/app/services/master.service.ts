import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl:string='https://projectapi.gerasim.in/api/OnlineLearning/';
  constructor(private http: HttpClient) { }
  getAllCourses():Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetAllCourse`)
  }
  getCourseVideosbyCourseId(id:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetCourseVideosbyCourseId?courseId=${id}`)
  }
}
