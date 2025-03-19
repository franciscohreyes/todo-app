import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//
import { ConfirmDialogData } from '@modules/auth/models/dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  /**
   * onConfirm
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * onCancel
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
