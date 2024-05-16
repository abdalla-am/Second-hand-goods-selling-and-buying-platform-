import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  private notificationsSubject = new BehaviorSubject<string[]>([]);
  public notifications$: Observable<string[]> = this.notificationsSubject.asObservable();
  private notificationVisible: boolean = false;
  notificationVisibility: Subject<boolean> = new Subject<boolean>();

  constructor(private db: AngularFireDatabase) { }

  addNotification(notification: string, id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Save notification to Firebase Realtime Database
    this.saveNotificationToFirebase(notification, id);
  }

  clearNotifications() {
    this.notificationsSubject.next([]);
  }
  
  showNotificationPopup() {
    this.notificationVisible = true;
    this.notificationVisibility.next(true);
  }

  // Method to hide the notification popup
  hideNotificationPopup() {
    this.notificationVisible = false;
    this.notificationVisibility.next(false);
  }

  private saveNotificationToFirebase(notification: string, id: string): void {
    // Assuming you have a 'notifications' node in your Firebase Realtime Database
    this.db.list(`/users/${id}/notifications`).push(notification);
  }

  // Get notifications of the current user
  getNotificationsOfCurrentUser(userId: string): Observable<string[]> {
    return this.db.list(`/users/${userId}/notifications`).valueChanges() as Observable<string[]>;
  }
}
