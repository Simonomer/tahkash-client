import {Component, Input, OnInit} from '@angular/core';
import {some as _some} from 'lodash';

import {ITag} from '../../../models/tag';
import {ConnectionsService} from '../../../services/connections.service';
import {Subject} from 'rxjs';
import {IForm} from '../../../models/form';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  allTags: ITag[];
  currentTags: ITag[];
  filterString: string;
  @Input() allForms: IForm[];

  tagAdded: Subject<string>;
  tagRemoved: Subject<string>;
  inputUpdated: Subject<string>;
  @Input() formsFiltered: Subject<IForm[]>;

  constructor(private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();
    this.inputUpdated = new Subject<string>();

    this.connectionsService.getTags().subscribe(tags => {
      this.allTags = tags;
      const localhostTagNames = this.getTagNamesFromLocalhost();
      this.currentTags = this.allTags.filter(tag => localhostTagNames.includes(tag.text));
    });

    this.inputUpdated.subscribe(filterString => {
      this.filterString = filterString;
      this.filterForms();
    });

    this.tagAdded.subscribe(tagId => {
      this.currentTags.push(this.allTags.find(tag => tag._id === tagId));
      this.postTagsToLocalHost(this.currentTags.map(tag => tag.text));
      this.filterForms();
    });

    this.tagRemoved.subscribe(tagId => {
      this.currentTags = this.currentTags.filter(tag => tag._id !== tagId);
      this.postTagsToLocalHost(this.currentTags.map(tag => tag.text));
      this.filterForms();
    });
  }

  filterForms() {
    let filterForms = this.allForms?.slice();

    if (this.filterString) {
      filterForms = filterForms.filter(form => form.name.includes(this.filterString));
    }

    const filteredTagIds = this.currentTags.map(tag => tag._id);
    if (filteredTagIds.length) {
      filterForms = filterForms.filter(form => {
        const tagIds = form.tags.map(tag => tag._id);
        return !_some(filteredTagIds, tagId => !tagIds.includes(tagId));
      })
    }

    this.formsFiltered.next(filterForms);
  }

  getTagNamesFromLocalhost(): string[] {
    return [];
  }

  postTagsToLocalHost(tagNames: string[]): void{
    return;
  }
}
