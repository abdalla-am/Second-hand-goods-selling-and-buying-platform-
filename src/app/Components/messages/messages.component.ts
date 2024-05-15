import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { MessagesService } from '../../Services/messages.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnChanges {
  chatData: any;
  UserChats: any[] | undefined; // Assuming you have an array of user chats
  activeChat: any; // Variable to store the active chat
  sidebarVisible: boolean = false; // Variable to track sidebar visibility
  selectedChat: any;
  newMessage: string = ''; // To store the new message temporarily
  chatindex: number | undefined;

  constructor(
    private auth: AutheroizedUserService,
    private chatService: MessagesService,
    private db: AngularFireDatabase
  ) { }

  ngOnChanges(): void {
    
    this.getChatDataForCurrentUser();
  }

  ngOnInit(): void {
    this.getChatDataForCurrentUser();
  }

  getChatDataForCurrentUser(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.chatService.getChatData(currentUser.uid).subscribe(
        data => {
          this.chatData = data;
        },
        error => {
          console.error('Error fetching chat data:', error);
        }
      );
    }
  }

  sendMessage() {
    if (!this.selectedChat || !this.newMessage.trim()) {
      return;
    }

    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      return;
    }

    const message = {
      message: this.newMessage.trim(),
      sender: 'You'
    };

    // Update the selected chat's messages array directly
    this.selectedChat.messages.push(message);

    // Clear input after sending
    this.newMessage = '';

    // Save message to Firestore
    this.saveMessageToFirestore(message);
  }

  saveMessageToFirestore(message: any) {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      return;
    }

    // Push the message to Firestore under the chat's messages collection
    this.db.list(`users_chats/${currentUser.uid}/chats/${this.chatindex}/messages`).push(message)
      .then(() => {
        console.log('Message saved to Firestore');
        // Since we've saved a new message, we want to render messages again
        this.renderMessages();
      })
      .catch((error) => {
        console.error('Error saving message to Firestore:', error);
      });
  }

  selectChat(chat: any , index: number) {
    this.chatindex = index;
    this.selectedChat = chat;
  }

  renderMessages() {
    // Fetch messages from the database based on selectedChat and chatindex
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser || !this.selectedChat || this.chatindex === undefined) {
      return;
    }

    this.db.list(`users_chats/${currentUser.uid}/chats/${this.chatindex}/messages`)
      .valueChanges()
      .subscribe(
        (messages: any[]) => {
          // Update the selected chat's messages array with the fetched messages
          this.selectedChat.messages = messages;
        },
        error => {
          console.error('Error fetching messages from Firestore:', error);
        }
      );
  }
}
