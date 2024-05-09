import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { UserService } from '../../Services/user.service';
 //added by Abdalla



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
// export class LoginPageComponent {
//   loginError: boolean = false; // Add loginError flag
  
//   constructor(private authService: AutheroizedUserService, 
//               private router: Router,
//               private userService: UserService) { }

//   login(loginForm: NgForm) {
//     if (loginForm.valid) {
//       const email = loginForm.value.email;
//       const password = loginForm.value.password;
//       this.userService.loginUser(email, password).subscribe(user => {
//         if (user) {
//           console.log("Login successful!");
//           // Redirect to home page
//           this.router.navigate(['/']);
//         } else {
//           console.log("Invalid credentials. Please try again.");
//           this.loginError = true; // Set loginError flag to true
//         }
//       });
//     } else {
//       console.log("Form invalid. Please fill all required fields.");
//     }
//   }
// }


export class LoginPageComponent implements OnInit{
  
  email:string='';
  password :string='';

  constructor(private auth : AutheroizedUserService) { }
  ngOnInit(): void {
  }
  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }
}