import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {difference as _difference} from 'lodash';
import {IBucket} from '../../models/bucket';

@Component({
  selector: 'chips-auto-complete',
  templateUrl: './chips-auto-complete.component.html',
  styleUrls: ['./chips-auto-complete.component.scss']
})
export class ChipsAutoCompleteComponent implements OnInit {

  removable = true;
  separatorKeysCodes: number[] = [ENTER];
  chipsCtrl = new FormControl();
  filteredBuckets: Observable<string[]>;

  @Input() currentBuckets: IBucket[];
  @Input() allBuckets: IBucket[];
  @Input() bucketAdded: Subject<string>;
  @Input() bucketRemoved: Subject<string>;
  @Input() inputUpdating: Subject<string>;
  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredBuckets = this.chipsCtrl.valueChanges.pipe(
      startWith(null),
      map((bucket: string | null) => bucket ? this._filter(bucket) :
        _difference(this.allBuckets.map(bucket1 => bucket1.name),
          this.currentBuckets.map(bucket1 => bucket1.name))));

    if (this.inputUpdating) {
      this.chipsCtrl.valueChanges.subscribe(value => this.inputUpdating.next(value));
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const foundBucket = this.allBuckets.find(bucket => bucket.name === value.trim());
      if (foundBucket) {
        this.bucketAdded.next(foundBucket._id);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.chipsCtrl.setValue(null);
  }

  remove(bucketId: string): void {
    const foundBucket = this.currentBuckets.find(bucket => bucket._id === bucketId);

    if (foundBucket) {
      this.bucketRemoved.next(bucketId);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const foundBucket = this.allBuckets.find(bucket => bucket.name === event.option.viewValue);
    this.bucketAdded.next(foundBucket._id);
    this.chipsInput.nativeElement.value = '';
    this.chipsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allBuckets.map(bucket => bucket.name).filter(bucket => bucket.toLowerCase().indexOf(filterValue) === 0);
  }
}
