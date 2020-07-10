import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'new-form-dialog',
  templateUrl: 'new-form-dialog.component.html',
})
export class NewFormDialogComponent {

  formName: string;

  constructor(public dialogRef: MatDialogRef<NewFormDialogComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
