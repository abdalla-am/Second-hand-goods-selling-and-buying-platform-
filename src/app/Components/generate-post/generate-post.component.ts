import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { AdvertisementService } from '../../Services/advertisement.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Import AngularFireStorage
import { finalize } from 'rxjs/operators'; // Import finalize
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
    files: [] // Assuming you have a files array to store uploaded files
  };
  selectedImage: File | null = null;
  userId!: string;

  constructor(
    private categoryService: CategoriesService,
    private adsService: AdvertisementService,
    private storage: AngularFireStorage ,
    private auth : AutheroizedUserService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  postAd() {
    const currentuser = this.auth.getCurrentUser();
    if(currentuser){
      this.userId = currentuser.uid;
    }
    if (this.selectedImage) {
      const filePath = `adImages/${this.selectedImage.name}`; // Define file path in storage
      const fileRef = this.storage.ref(filePath); // Reference to storage path
      const task = this.storage.upload(filePath, this.selectedImage);

      // Get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // Set the URL of the uploaded image to the ad object
            this.ad.imageURL = url;
            
            // Save ad using the ad service
            this.adsService.saveAd(this.ad ,this.userId )
              .then(() => {
                console.log('Ad saved successfully');
                // Reset ad object for next entry
                this.ad = {
                  title: '',
                  description: '',
                  category: '',
                  date_created: '',
                  condition: '',
                  price: null,
                  location: '',
                  files: []
                };
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
}
