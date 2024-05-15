import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { AdvertisementService } from '../../Services/advertisement.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';

@Component({
  selector: 'app-generate-post',
  templateUrl: './generate-post.component.html',
  styleUrls: ['./generate-post.component.css']
})
export class GeneratePostComponent implements OnInit {
  categories: { value: string; label: string; icon: string; }[] = [];
  ad: any = {
    title: '',
    description: '',
    category: '',
    date_created: '',
    condition: '',
    price: null,
    location: '',
    imageURL: '', // Add imageURL property to store the download URL of the image
    files: [] // Assuming you have a files array to store uploaded files
  };
  selectedImage: File | null = null;
  userId!: string;

  constructor(
    private categoryService: CategoriesService,
    private adsService: AdvertisementService,
    private storage: AngularFireStorage,
    private auth: AutheroizedUserService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  postAd() {
    const currentuser = this.auth.getCurrentUser();
    if (currentuser) {
      this.userId = currentuser.uid;
    }
    if (this.selectedImage) {
      const filePath = `adImages/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            // Set the URL of the uploaded image to the ad object
            this.ad.imageURL = url;
  
            // Now, all advertisement data including imageURL is ready, let's save it
            this.adsService.saveAd(this.ad, this.userId)
              .then(() => {
                console.log('Ad saved successfully');
                this.clearForm();
              })
              .catch(error => {
                console.error('Error saving ad:', error);
              });
          });
        })
      ).subscribe();
    } else {
      // Handle case when no image is selected
    }
  }
  
  
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  clearForm() {
    // Clear form fields and selected image
    this.ad = {
      title: '',
      description: '',
      category: '',
      date_created: '',
      condition: '',
      price: null,
      location: '',
      imageURL: '',
      files: []
    };
    this.selectedImage = null;
  }
}
