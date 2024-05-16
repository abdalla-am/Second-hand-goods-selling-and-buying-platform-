// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../../Services/notification-service.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];
  isVisible: boolean = false;

  constructor(
    private notificationService: NotificationServiceService,
    private auth: AutheroizedUserService
  ) { }

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      console.error('Current user not found.');
      return;
    }
    // Subscribe to the notifications of the current user
    this.notificationService.getNotificationsOfCurrentUser(currentUser.uid).subscribe(notifications => {
      this.notifications = notifications;
      // Check if there are new notifications to show
      this.isVisible = this.notifications.length > 0;
    });
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
    // Hide the notification popup after clearing notifications
    this.isVisible = false;
  }
}
