import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { UserCoursesComponent } from './pages/user-courses/user-courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'coursedetail/:id',
        component:CourseDetailsComponent
    },
    {
        path:'my-courses',
        component:MyCoursesComponent
    },
    {
        path:'user-courses',
        component:UserCoursesComponent
    }
];
