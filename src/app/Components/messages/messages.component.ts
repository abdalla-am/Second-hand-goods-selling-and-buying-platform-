import { Component } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { MessagesService } from '../../Services/messages.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  chatData: any;
  UserChats: any[] | undefined; // Assuming you have an array of user chats
  activeChat: any; // Variable to store the active chat
  sidebarVisible: boolean = false; // Variable to track sidebar visibility
  selectedChat: any;
  newMessage: string = ''; // To store the new message temporarily
  chatindex : number | undefined;


  constructor(
    private auth: AutheroizedUserService,
    private chatService: MessagesService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.getChatDataForCurrentUser();
  }
  getChatDataForCurrentUser(): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      this.chatService.getChatData(currentUser.uid)
      
        .subscribe(
          data => {
            alert(currentUser.uid);
            this.chatData = data;
            console.log(this.chatData);
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
      sender: "You"
    };
    this.selectedChat.messages.push(message);

    // Clear input after sending
    this.newMessage = '';
    // Save message to Firestore
  }

  selectChat(chat: any , index : number) {
    this.chatindex = index;
    this.selectedChat = chat;
  }
}