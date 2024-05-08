import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { FavouritesComponent } from './Components/favourites/favourites.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { GeneratePostComponent } from './Components/generate-post/generate-post.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { UserAdsComponent } from './Components/user-ads/user-ads.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:"SignUp" , component : SignUpComponent},
  {path: 'Login' , component : LoginPageComponent},
  {path : 'Favourites' , component : FavouritesComponent},
  { path: 'Dashboard', component: DashboardComponent },
  {path:"EditProfile" , component : EditProfileComponent},
  {path: 'NewPost' , component : GeneratePostComponent},
  {path : 'Messages' , component : MessagesComponent},
  { path: 'MyAds', component: UserAdsComponent },
  {path : "ForgetPassword" , component : ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
