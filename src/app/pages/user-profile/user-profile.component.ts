import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { User } from '../../model/master.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  storageService = inject(StorageService);
    
      loggedUserData: User = new User();
      router=inject(Router)
      constructor() {
        const localData = this.storageService.getItem('learningUser');
        if (localData != null) {
          const parseData = JSON.parse(localData);
          this.loggedUserData = parseData;
        }
      }

}
