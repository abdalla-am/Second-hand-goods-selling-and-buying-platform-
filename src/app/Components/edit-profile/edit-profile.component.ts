import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  location: string = '';
  website: string = '';
  bio: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  saveChanges() {
    // Implement logic to save changes
    console.log('Changes saved');
  }

  changePassword() {
    // Implement logic to change password
    console.log('Password changed');
  }

  deleteAccount() {
    // Implement logic to delete account
    console.log('Account deleted');
  }

}
