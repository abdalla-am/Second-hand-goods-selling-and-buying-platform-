import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }

  // private users: User[] = [
  //   {
  //     id: 1,
  //     fullName: "John Doe",
  //     email: "john.doe@example.com",
  //     phone: "+1234567890",
  //     location: "New York, USA",
  //     website: "https://www.example.com/johndoe",
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum, id suscipit ligula facilisis ac. Praesent ultricies augue metus.",
  //     password: "password123" // Add password field to the user data
  //   },
  //   {
  //     id: 2,
  //     fullName: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     phone: "+1987654321",
  //     location: "Los Angeles, USA",
  //     website: "https://www.example.com/janesmith",
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum, id suscipit ligula facilisis ac. Praesent ultricies augue metus.",
  //     password: "password456" // Add password field to the user data
  //   },
  //   {
  //     id: 3,
  //     fullName: "Alice Johnson",
  //     email: "alice.johnson@example.com",
  //     phone: "+1122334455",
  //     location: "Chicago, USA",
  //     website: "https://www.example.com/alicejohnson",
  //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum, id suscipit ligula facilisis ac. Praesent ultricies augue metus.",
  //     password: "password789" // Add password field to the user data
  //   }
  // ];

  // Method to fetch dummy user data
  // getUsers(): Observable<User[]> {
  //   return of(this.users);
  // }

  // // Method to check if the provided email and password match any user's credentials
  // loginUser(email: string, password: string): Observable<User | null> {
  //   const user = this.users.find(u => u.email === email && u.password === password);
  //   return of(user ? user : null);
  // }
}
