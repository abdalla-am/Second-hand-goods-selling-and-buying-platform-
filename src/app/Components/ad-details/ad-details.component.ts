import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from '../../Services/advertisement.service';
import { UsersService } from '../../Services/users.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { NotificationServiceService } from '../../Services/notification-service.service';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent {
  ad: any;
  userData: any;
  userComment: string = '';
  userId: string = '';
  userRating: number | undefined;
  uName: string = '';

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private userService: UsersService,
    private auth: AutheroizedUserService,
    private notificationService: NotificationServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const adId = params['id'];
      this.getAdvertisement(adId);
    });
  }

  getAdvertisement(adId: string): void {
    this.adService.getAdvertisementById(adId).subscribe(ad => {
      this.ad = ad;
      this.userId = this.ad.authorID;
      this.getUserData(this.ad.authorID);
    });
  }

  getUserData(uid: string): void {
    this.userService.getUserData(uid).subscribe(userData => {
      this.userData = userData;
    });
  }

  submitComment() {
    if (this.userComment.trim() === '') {
      // Handle empty comment submission if necessary
      return;
    }
    if (this.userRating === undefined || this.userRating < 1 || this.userRating > 5) {
      // Handle invalid rating if necessary
      return;
    }
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      console.error('Current user not found.');
      return;
    }

    const feedbackObject = {
      from_user_id: currentUser.uid,
      comment: this.userComment,
      rating: this.userRating
    };

    this.userService.saveFeedback(this.ad.authorID, feedbackObject)
      .then(() => {
        this.userService.getUserName(currentUser.uid).subscribe((name) => {
          this.uName = name;
          alert(this.uName); // Fixed alert call
          console.log('Comment submitted and feedback updated successfully');
          this.notificationService.addNotification(this.uName + ' commented on your ad ' + this.ad.title, this.ad.authorID);
        });
      })
      .catch(error => {
        console.error('Error updating feedback:', error);
        // Handle error...
      });

    // Clear the comment field and rating after submission
    this.userComment = '';
    this.userRating = undefined;
  }
}
