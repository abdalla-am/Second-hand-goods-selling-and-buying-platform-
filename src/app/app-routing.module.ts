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
import { AdsComponent } from './Components/ads/ads.component';
import { FiltersSidebarComponent } from './Components/filters-sidebar/filters-sidebar.component';
import { FeedBackComponent } from './Components/feed-back/feed-back.component';
import { AdDetailsComponent } from './Components/ad-details/ad-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'SignUp', component: SignUpComponent, data: { breadcrumb: 'Sign Up' } },
  { path: 'Login', component: LoginPageComponent, data: { breadcrumb: 'Login' } },
  { path: 'Favourites', component: FavouritesComponent, data: { breadcrumb: 'Favourites' } },
  { path: 'Dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
  { path: 'EditProfile', component: EditProfileComponent, data: { breadcrumb: 'Edit Profile' } },
  { path: 'NewPost', component: GeneratePostComponent, data: { breadcrumb: 'New Post' } },
  { path: 'Messages', component: MessagesComponent, data: { breadcrumb: 'Messages' } },
  { path: 'MyAds', component: UserAdsComponent, data: { breadcrumb: 'My Ads' } },
  { path: 'ads/:category', component: AdsComponent, data: { breadcrumb: 'Ads' } },
  { path: 'filtersidebar', component: FiltersSidebarComponent, data: { breadcrumb: 'Filter Sidebar' } },
  {path : 'FeedBack' , component : FeedBackComponent , data: { breadcrumb: 'FeedBack' }},
  { path: 'ad/:id', component: AdDetailsComponent, data: { breadcrumb: 'Ad Details' } }, // Route for ad details with ad ID as parameter
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
