import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { url } from 'inspector';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  location: string = '';
  website: string = '';
  bio: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  // photoURl:string='';


  profileImageUrl: string | null = null;



  constructor(
    private usersService: UsersService,
    private authService: AutheroizedUserService,
    private storage: AngularFireStorage, 
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    const uid = this.authService.getLoggedInUserID();
    if (uid) {
      this.usersService.getUserData(uid).subscribe((userData: any) => {
        if (userData) {
          

          //for photo component-------------------------------------------------------------------------------------------
          this.storage.ref(`users/${uid}/profile.jpg`).getDownloadURL().subscribe(url => {this.profileImageUrl = url});
          //alert('Profile Image URL:'+ this.profileImageUrl);
          this.profileImageUrl =userData.photoURL;
          //---------------------------------------------------------------------------------------------------------------

          this.fullName = userData.full_name || '';
          this.email = userData.email || '';
          this.phone = userData.phone || '';
          this.location = userData.location || '';
          this.website = userData.website || '';
          this.bio = userData.bio || '';
          
        }
      });
    }
  }



  //for photo ---------------------------------------------------------------------------------------
  onFileSelected(event: any) {
    const uid = this.authService.getLoggedInUserID();
    const file = event.target.files[0];
    const filePath = `users/${uid}/profile.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Upload the file and get the profile image URL
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.profileImageUrl = url;
        });
      })
    ).subscribe();
  }
  //--------------------------------------------------------------------------------------------------



  saveChanges() {
    const uid = this.authService.getLoggedInUserID();
    if (uid) {
      const updatedUserData = {
        full_name: this.fullName,
        email: this.email,
        phone: this.phone,
        location: this.location,
        website: this.website,
        bio: this.bio
      };
      this.usersService.updateUserData(uid, updatedUserData).subscribe(() => {
        //alert('User data updated successfully');
        console.log('User data updated successfully');
      }, error => {
        console.error('Error updating user data:', error);
        // Handle error appropriately
      });
    }
  }

  changePassword() {
    const uid = this.authService.getLoggedInUserID();
    if (uid && this.newPassword === this.confirmPassword) {
      this.authService.changePassword(this.currentPassword, this.newPassword)
        .then(() => {
          alert('Password changed successfully');
          console.log('Password changed successfully');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        })
        .catch(error => {
          console.error('Error changing password:', error);
          // Handle error appropriately
        });
    } else {
      alert('New password and confirm password do not match');
    }
  }
  
  deleteAccount() {
    const uid = this.authService.getLoggedInUserID();
    if (uid) {
      if (confirm('Are you sure you want to delete your account?')) {
        this.authService.deleteAccount()
          .then(() => {
            this.authService.deleteUserData(uid).subscribe(() => {
              alert('Account deleted successfully');
              console.log('Account deleted successfully');
              // Redirect or perform any other action
            }, error => {
              console.error('Error deleting user data:', error);
              // Handle error appropriately
            });
          })
          .catch(error => {
            console.error('Error deleting account:', error);
            // Handle error appropriately
          });
      }
    }
  }  
}
