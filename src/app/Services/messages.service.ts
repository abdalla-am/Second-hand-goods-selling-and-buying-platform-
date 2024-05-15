import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private apiUrl = 'https://second-hand-sellingandbuying-default-rtdb.firebaseio.com/users_chats'; // Replace with your API endpoint URL

  constructor(private db: AngularFireDatabase) { }

  getChatData(userId: string): Observable<any> {
    return this.db.object(`/users_chats/${userId}`).valueChanges();
  }
  addMessageToChat(senderId: string, receiverId: string, message: any): Promise<void> {
    // Construct the path to the chat between sender and receiver
    const chatPath = `/users_chats/${senderId}/chats/${receiverId}/messages`;

    // Push the new message to the chat's messages array
    return new Promise<void>((resolve, reject) => {
      this.db.list(chatPath).push(message)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }
}
