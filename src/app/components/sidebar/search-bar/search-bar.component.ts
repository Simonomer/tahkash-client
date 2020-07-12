import {Component, Input, OnInit} from '@angular/core';
import {some as _some} from 'lodash';

import {ITag} from '../../../models/tag';
import {ConnectionsService} from '../../../services/connections.service';
import {Subject} from 'rxjs';
import {IForm} from '../../../models/form';
import {LocalstorageService} from '../../../services/localstorage.service';
import {Timestamps} from '../../../models/timestamp.enum';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  _allForms: IForm[];
  @Input()
  set allForms(allForms: IForm[]) {
    this._allForms = allForms;
    if (allForms) {
      this.filterForms();
    }
  }
  get allForms() { return this._allForms; }

  allTags: ITag[];
  currentTags: ITag[];
  filterString: string;
  currentTimeBackFilter: Timestamps;

  tagAdded: Subject<string>;
  tagRemoved: Subject<string>;
  inputUpdated: Subject<string>;
  @Input() formsFiltered: Subject<IForm[]>;

  timeStampsToData = {
    [Timestamps.Week]: { value: 7, description: 'השבוע האחרון'},
    [Timestamps.Month]: { value: 30, description: 'החודש האחרון'},
    [Timestamps.Year]: { value: 365, description: 'השנה האחרונה'},
    [Timestamps.Forever]: { value: 10000, description: 'קום המערכת'}
  }

  constructor(private connectionsService: ConnectionsService,
              private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();
    this.inputUpdated = new Subject<string>();

    this.connectionsService.getTags().subscribe(tags => {
      this.allTags = tags;
      const localhostTagNames = this.localstorageService.getByKey(this.localstorageService.TAG_NAMES);
      this.currentTags = this.allTags.filter(tag => localhostTagNames?.includes(tag.text));
    });

    this.inputUpdated.subscribe(filterString => {
      this.filterString = filterString;
      this.filterForms();
    });

    this.tagAdded.subscribe(tagId => {
      this.currentTags.push(this.allTags.find(tag => tag._id === tagId));
      this.localstorageService.setItem(this.localstorageService.TAG_NAMES,this.currentTags.map(tag => tag.text));
      this.filterForms();
    });

    this.tagRemoved.subscribe(tagId => {
      this.currentTags = this.currentTags.filter(tag => tag._id !== tagId);
      this.localstorageService.setItem(this.localstorageService.TAG_NAMES,this.currentTags.map(tag => tag.text));
      this.filterForms();
    });

    if (Timestamps[this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS)]) {
      const currentDatetimeFilter: string = this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS);
      const currentTimebackString: string = Timestamps[currentDatetimeFilter];
      this.currentTimeBackFilter = Timestamps[currentTimebackString];
    } else {
      this.currentTimeBackFilter = Timestamps[Timestamps[Timestamps.Week]];
    }
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

    if (this.currentTimeBackFilter !== Timestamps.Forever) {
      filterForms = filterForms.filter(form => {
        const currentDatePlusDaysBack = new Date(form.creationTime)
        const wantedBackTimeFilter: number = this.currentTimeBackFilter;
        currentDatePlusDaysBack.setDate(currentDatePlusDaysBack.getDate() + this.timeStampsToData[wantedBackTimeFilter].value)
        return Number(currentDatePlusDaysBack) > Number(Date.now())
      } )
    }

    this.formsFiltered.next(filterForms);
  }

  onTimestampChange(timestamp: string) {
    const currentTimestamp: string = Timestamps[timestamp];
    this.currentTimeBackFilter = Timestamps[currentTimestamp];
    this.localstorageService.setItem(this.localstorageService.TIME_BACK_FORMS, this.currentTimeBackFilter)
    this.filterForms();
  }
}
