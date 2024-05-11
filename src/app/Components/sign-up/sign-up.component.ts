
import { Component, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { GovernorateService } from '../../Services/governorate.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent{

  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  governorate: string = '';
  location: string = '';
  gender: string = '';
  government: any;

  constructor(private authService: AutheroizedUserService , private governmentservice : GovernorateService) { }

  ngOnInit(): void {
    this.government = this.governmentservice.getGovernorates();
  }
  
  register(): void {
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    
    const additionalData = {
      name: this.name,
      phone: this.phone,
      governorate: this.governorate,
      location: this.location,
      gender: this.gender
    };
    this.authService.register(this.email, this.password, additionalData);
    this.email = '';
    this.password = '';
  }
  
}
