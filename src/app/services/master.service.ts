import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IEnrollment, Login, User } from '../model/master.model';

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
  addNewUser(obj:User):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.apiUrl}AddNewUser`,obj)
  }
  onLogin(obj:Login):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.apiUrl}login`,obj)
  }
  onEnrollment(obj:IEnrollment):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.apiUrl}CreateNewEnrollment`,obj)
  }
  getEnrolledCourseByUserId(id:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetEnrolledCourseByUserId?userId=${id}`)
  }
  deleteEnrollment(id:number):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(`${this.apiUrl}DeleteEnrollment?enrollmentId=${id}`)
  }
}
