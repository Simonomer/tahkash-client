import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {FormsManagementService} from './forms.management.service';
import {TagsManagementService} from './tags.management.service';
import {IForm} from '../models/form';
import {ITag} from '../models/tag';
import {Subject} from 'rxjs';
import {Timestamps} from '../models/timestamp.enum';
import {some as _some} from 'lodash';
import {LocalstorageService} from './localstorage.service';

@Injectable()
export class FilterService {

  filteredForms: IForm[] = [];
  filteredTags: ITag[] = [];
  queryString: string;
  timeBackFilter: Timestamps;

  filteredFormsChanged: Subject<IForm[]> = new Subject<IForm[]>();
  filteredTagsChanged: Subject<ITag[]> = new Subject<ITag[]>();
  timeBackFilterChanged: Subject<Timestamps> = new Subject<Timestamps>();

  timeStampsToData = {
    [Timestamps.Week]: { value: 7, description: 'השבוע האחרון'},
    [Timestamps.Month]: { value: 30, description: 'החודש האחרון'},
    [Timestamps.Year]: { value: 365, description: 'השנה האחרונה'},
    [Timestamps.Forever]: { value: 10000, description: 'קום המערכת'}
  }

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private tagsManagementService: TagsManagementService,
              private localstorageService: LocalstorageService) {
  }

  init() {

    this.updateTimeBackFilter(this.timeBackFilter)

    this.connectionsService.getTags().subscribe(tags => {
      const localhostTagNames = this.localstorageService.getByKey(this.localstorageService.TAG_NAMES);
      this.filteredTags = tags.filter(tag => localhostTagNames?.includes(tag.text));
      this.updateTags();
    });
  }

  updateTimeBackFilter(timeBackFilter: Timestamps) {
    const currentTimestamp: string = Timestamps[timeBackFilter];
    this.timeBackFilter = Timestamps[currentTimestamp];
    this.localstorageService.setItem(this.localstorageService.TIME_BACK_FORMS, this.timeBackFilter)
    this.timeBackFilterChanged.next(this.timeBackFilter);
    this.filterForms();
  }

  updateFilterString(filterString: string) {
    this.queryString = filterString;
    this.filterForms();
  }

  addTag(tagId: string) {
    this.filteredTags.push(this.tagsManagementService.allTags.find(tag => tag._id === tagId));
    this.updateTags();
  }

  removeTag(tagId: string) {
    this.filteredTags = this.filteredTags.filter(tag => tag._id !== tagId);
    this.updateTags();
  }

  updateTags() {
    this.localstorageService.setItem(this.localstorageService.TAG_NAMES, this.filteredTags.map(tag => tag.text));
    this.filteredTagsChanged.next(this.filteredTags);
    this.filterForms();
  }

  filterForms() {
    let filterForms = this.formsManagementService.forms?.slice();

    if (this.queryString) {
      filterForms = filterForms.filter(form => form.name.includes(this.queryString));
    }

    const filteredTagIds = this.filteredTags.map(tag => tag._id);
    if (filteredTagIds.length) {
      filterForms = filterForms.filter(form => {
        const tagIds = form.tags.map(tag => tag._id);
        return !_some(filteredTagIds, tagId => !tagIds.includes(tagId));
      })
    }

    if (this.timeBackFilter !== Timestamps.Forever) {
      filterForms = filterForms.filter(form => {
        const currentDatePlusDaysBack = new Date(form.creationTime)
        const wantedBackTimeFilter: number = this.timeBackFilter;
        currentDatePlusDaysBack.setDate(currentDatePlusDaysBack.getDate() + this.timeStampsToData[wantedBackTimeFilter].value)
        return Number(currentDatePlusDaysBack) > Number(Date.now())
      } )
    }

    this.filteredForms = filterForms;
    this.filteredFormsChanged.next(filterForms);
  }

}
