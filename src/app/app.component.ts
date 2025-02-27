import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IApiResponse, Login, User } from './model/master.model';
import { MasterService } from './services/master.service';
import { inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'online-course-portal';
  isLoginFormVisible: boolean = true;

  userRegisterObj: User = new User();
  loginObj: Login = new Login();

  masterSrv = inject(MasterService);
  storageService = inject(StorageService);

  loggedUserData: User = new User();

  constructor() {
    const localData = this.storageService.getItem('learningUser');
    if (localData != null) {
      const parseData = JSON.parse(localData);
      this.loggedUserData = parseData;
    }
  }

  toggleForm(val: boolean) {
    this.isLoginFormVisible = val;
  }
  

  onlogoff() {
    Swal.fire({
      title: 'Are you sure you want to log off?',
      text: 'You will need to log in again to access your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log off',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logoff action if the user confirms
        this.loggedUserData = new User();
        this.storageService.removeItem('learningUser');
        console.log('User logged off successfully.');
      } else {
        // User canceled the logoff
        console.log('User canceled logoff.');
      }
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  

  
  openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onRegister() {
    this.masterSrv.addNewUser(this.userRegisterObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        Swal.fire({   title: "User Registered!",   text: "You clicked the button!",   icon: "success"});
        this.closeModal();
      } else {
        Swal.fire({   title: res.message,   text: "You clicked the button!",   icon: "warning"});
       
      }
    });
  }

  onLogin() {
    this.masterSrv.onLogin(this.loginObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        
        // alert('User Logged Success');
        Swal.fire({   title: res.message,   text: "User Logged Success!",   icon: "success"});

        this.storageService.setItem('learningUser', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeModal();
      } else {
        // alert(res.message);
        Swal.fire({   title: res.message,   text: "Please complete",   icon: "warning"});

      }
    });
  }
}
