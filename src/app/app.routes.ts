import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { UserCoursesComponent } from './pages/user-courses/user-courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CourseSpecificationComponent } from './pages/course-specification/course-specification.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

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
    },
    {
        path: 'course-specification/:id',
        component:CourseSpecificationComponent
    },
    {
        path:'user-profile',
        component:UserProfileComponent
    }
];
