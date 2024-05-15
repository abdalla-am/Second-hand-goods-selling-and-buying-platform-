import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';// Import your confirmation dialog component

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
  profileImageUrl: string | null = null;

  constructor(
    private usersService: UsersService,
    private authService: AutheroizedUserService,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const uid = this.authService.getLoggedInUserID();
    if (uid) {
      this.usersService.getUserData(uid).subscribe((userData: any) => {
        if (userData) {
          this.storage
            .ref(`users/${uid}/profile.jpg`)
            .getDownloadURL()
            .subscribe((url) => {
              this.profileImageUrl = url;
            });
          this.profileImageUrl = userData.photoURL;
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

  onFileSelected(event: any) {
    const uid = this.authService.getLoggedInUserID();
    const file = event.target.files[0];
    const filePath = `users/${uid}/profile.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.profileImageUrl = url;
        });
      })
    ).subscribe();
  }

  saveChanges() {
    this.openConfirmationDialog('Save Changes', 'Are you sure you want to save the changes?');
  }

  changePassword() {
    this.openConfirmationDialog('Change Password', 'Are you sure you want to change your password?');
  }

  deleteAccount() {
    this.openConfirmationDialog('Delete Account', 'Are you sure you want to delete your account?');
  }

  openConfirmationDialog(action: string, message: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { action, message }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action === 'Save Changes') {
          this.saveChangesConfirmed();
        } else if (action === 'Change Password') {
          this.changePasswordConfirmed();
        } else if (action === 'Delete Account') {
          this.deleteAccountConfirmed();
        }
      }
    });
  }

  saveChangesConfirmed() {
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
        console.log('User data updated successfully');
      }, error => {
        console.error('Error updating user data:', error);
      });
    }
  }

  changePasswordConfirmed() {
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
        });
    } else {
      alert('New password and confirm password do not match');
    }
  }

  deleteAccountConfirmed() {
    const uid = this.authService.getLoggedInUserID();
    if (uid) {
      if (confirm('Are you sure you want to delete your account?')) {
        this.authService.deleteAccount()
          .then(() => {
            this.authService.deleteUserData(uid).subscribe(() => {
              alert('Account deleted successfully');
              console.log('Account deleted successfully');
            }, error => {
              console.error('Error deleting user data:', error);
            });
          })
          .catch(error => {
            console.error('Error deleting account:', error);
          });
      }
    }
  }
}
