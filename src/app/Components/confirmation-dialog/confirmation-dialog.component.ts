import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'confirmation-dialog',
  template: `
    <div class="confirmation-dialog">
      <h2 class="confirmation-dialog-header">{{ data.action }}</h2>
      <div class="confirmation-dialog-content">{{ data.message }}</div>
      <div class="confirmation-dialog-actions" align="end">
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
        <button mat-button [mat-dialog-close]="false">No</button>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}