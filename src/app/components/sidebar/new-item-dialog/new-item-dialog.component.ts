import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'new-form-dialog',
  templateUrl: 'new-item-dialog.component.html',
})
export class NewItemDialogComponent {

  itemName: string;

  constructor(public dialogRef: MatDialogRef<NewItemDialogComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
