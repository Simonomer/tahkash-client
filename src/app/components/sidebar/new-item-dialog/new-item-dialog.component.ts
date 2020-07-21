import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseContextManagementService} from '../../../services/contexts.service/management.services/course-context.management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'new-form-dialog',
  templateUrl: 'new-item-dialog.component.html',
})
export class NewItemDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewItemDialogComponent>,
              private courseContextManagementService: CourseContextManagementService) {}

  ngOnInit(): void {
    const courseContext = this.courseContextManagementService.courseContext;
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'course': new FormControl(courseContext.course, [Validators.required, Validators.pattern("^[0-9]*$")]),
      'week': new FormControl(courseContext.week, [Validators.required, Validators.pattern("^[0-9]*$")]),
    })
  }

  onCloseClick(): void {
    this.dialogRef.close({});
  }

  closeDialog() {
    this.dialogRef.close({
      name: this.form.get('name').value,
      course: this.form.get('course').value,
      week: this.form.get('week').value
    })
  }

}
