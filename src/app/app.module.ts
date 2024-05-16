import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { FavouritesComponent } from './Components/favourites/favourites.component';
import { GeneratePostComponent } from './Components/generate-post/generate-post.component';
import { UserAdsComponent } from './Components/user-ads/user-ads.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BreadCrumbComponent } from './Components/bread-crumb/bread-crumb.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FileUploadComponent } from './Components/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Import AngularFireDatabaseModule
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { AdsComponent } from './Components/ads/ads.component';
import { FiltersSidebarComponent } from './Components/filters-sidebar/filters-sidebar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SearchComponent } from './Components/search/search.component';
import { FeedBackComponent } from './Components/feed-back/feed-back.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdDetailsComponent } from './Components/ad-details/ad-details.component';
import { NotificationComponent } from './Components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    EditProfileComponent,
    MessagesComponent,
    FavouritesComponent,
    GeneratePostComponent,
    UserAdsComponent,
    DashboardComponent,
    BreadCrumbComponent,
    SidebarComponent,
    FileUploadComponent,
    AdsComponent,
    FiltersSidebarComponent,
    SearchComponent,
    FeedBackComponent,
    ConfirmationDialogComponent,
    AdDetailsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // Add AngularFireDatabaseModule here
    CommonModule,
    HttpClientModule, // Import HttpClientModule without .withFetch()
    MatProgressSpinnerModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
