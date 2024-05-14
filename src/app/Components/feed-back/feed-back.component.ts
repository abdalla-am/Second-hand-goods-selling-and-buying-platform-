import { Component, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { UsersService } from '../../Services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {
  feedback: any[] = [];
  users: any[] = [];

  constructor(
    private auth: AutheroizedUserService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    const userId = currentUser?.uid; // Replace with actual user ID
  
    if (userId) {
      this.usersService.getUserFeedBack(userId).subscribe(feedback => {
        this.feedback = feedback;
  
        // Get all users data
        this.usersService.getAllUsersData().subscribe(usersData => {
          // Assign the users data directly to this.users
          this.users = usersData;
  
          console.log('Users:', this.users); // Log users to see if it's populated correctly
         // this.matchUserNames(); // Call your logic after users are fetched
         this.feedback.forEach(item => {
          const user = this.users[item.from_user_id]; // Access user object directly using user ID
         alert(user.id);
          if (user) {
            item.userName = user.full_name; // Assign user's name to the feedback item
          }
        });
        }, error => {
          console.error('Error fetching users data:', error);
          // Handle error appropriately
        });
      }, error => {
        console.error('Error fetching user feedback:', error);
        // Handle error appropriately
      });
    }
  }
  
  
}
