import { Component, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { UsersService } from '../../Services/users.service';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css'],
})
export class FeedBackComponent implements OnInit {
  feedback: any[] = [];
  users: any[] = [];
  profileImageUrl: string | null = null;

  constructor(
    private auth: AutheroizedUserService,
    private usersService: UsersService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.uid; // Replace with actual user ID

    if (userId) {
      this.usersService.getUserFeedBack(userId).subscribe(
        (feedback) => {
          this.feedback = feedback;

          // Get all users data
          this.usersService.getAllUsersData().subscribe(
            (usersData) => {
              // Assign the users data directly to this.users
              this.users = usersData;

              console.log('Users:', this.users); // Log users to see if it's populated correctly
              // this.matchUserNames(); // Call your logic after users are fetched
              this.feedback.forEach((item) => {
                const user = this.users[item.from_user_id]; // Access user object directly using user ID
                //alert(item.from_user_id);
                if (user) {
                  // Assign user's name to the feedback item
                  item.userName = user.full_name; 
                  //for photo component-------------------------------------------------------------------------------------------
                  this.storage.ref(`users/${item.from_user_id}/profile.jpg`).getDownloadURL().subscribe(url => {item.profilePic = url});

                  //---------------------------------------------------------------------------------------------------------------

                }
              });
            },
            (error) => {
              console.error('Error fetching users data:', error);
              // Handle error appropriately
            }
          );
        },
        (error) => {
          console.error('Error fetching user feedback:', error);
          // Handle error appropriately
        }
      );
    }
  }
}
