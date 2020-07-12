import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {difference as _difference} from 'lodash';
import {ITag} from '../../models/tag';

@Component({
  selector: 'chips-auto-complete',
  templateUrl: './chips-auto-complete.component.html',
  styleUrls: ['./chips-auto-complete.component.scss']
})
export class ChipsAutoCompleteComponent implements OnInit {

  removable = true;
  separatorKeysCodes: number[] = [ENTER];
  chipsCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  @Input() currentTags: ITag[];
  @Input() allTags: ITag[];
  @Input() tagAdded: Subject<string>;
  @Input() tagRemoved: Subject<string>;
  @Input() inputUpdating: Subject<string>;
  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredTags = this.chipsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) :
        _difference(this.allTags?.slice().map(tag => tag.text), this.currentTags?.slice().map(tag => tag.text))));

    if (this.inputUpdating) {
      this.chipsCtrl.valueChanges.subscribe(value => this.inputUpdating.next(value))
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const foundTag = this.allTags.find(tag => tag.text === value.trim());
      if (foundTag) {
        this.tagAdded.next(foundTag._id);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.chipsCtrl.setValue(null);
  }

  remove(tagId: string): void {
    const foundTag = this.currentTags.find(tag => tag._id === tagId);

    if (foundTag) {
      this.tagRemoved.next(tagId);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const foundTag = this.allTags.find(tag => tag.text === event.option.viewValue);
    this.tagAdded.next(foundTag._id);
    this.chipsInput.nativeElement.value = '';
    this.chipsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.map(tag => tag.text).filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
