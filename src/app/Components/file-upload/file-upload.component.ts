import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  filesToUpload: File[] = [];

  constructor() {}

  handleFileInput(event: any): void {
    this.filesToUpload = event.target.files;
  }

  uploadFiles(): void {
    // Perform file upload logic here
    if (this.filesToUpload.length > 0) {
      // You can send files to server or perform any other operations here
      console.log('Uploading files:', this.filesToUpload);
    } else {
      console.warn('No files selected for upload.');
    }
  }

}
