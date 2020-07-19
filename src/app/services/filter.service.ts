import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {FormsManagementService} from './forms.management.service';
import {BucketsManagementService} from './buckets.management.service';
import {IForm} from '../models/form';
import {IBucket} from '../models/bucket';
import {Subject} from 'rxjs';
import {Timestamps} from '../models/timestamp.enum';
import {some as _some} from 'lodash';
import {LocalstorageService} from './localstorage.service';

@Injectable()
export class FilterService {

  filteredForms: IForm[] = [];
  filteredBuckets: IBucket[] = [];
  queryString: string;
  timeBackFilter: Timestamps;

  filteredFormsChanged: Subject<IForm[]> = new Subject<IForm[]>();
  filteredBucketsChanged: Subject<IBucket[]> = new Subject<IBucket[]>();
  timeBackFilterChanged: Subject<Timestamps> = new Subject<Timestamps>();

  timeStampsToData = {
    [Timestamps.Week]: {value: 7, description: 'השבוע האחרון'},
    [Timestamps.Month]: {value: 30, description: 'החודש האחרון'},
    [Timestamps.Year]: {value: 365, description: 'השנה האחרונה'},
    [Timestamps.Forever]: {value: 10000, description: 'קום המערכת'}
  };

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private bucketsManagementService: BucketsManagementService,
              private localstorageService: LocalstorageService) {
  }

  async init(): Promise<void> {
    this.updateTimeBackFilter(this.timeBackFilter);
    const buckets = await this.connectionsService.getBuckets();
    const localhostBucketNames = this.localstorageService.getByKey(this.localstorageService.BUCKET_NAMES);
    this.filteredBuckets = buckets.filter(bucket => localhostBucketNames?.includes(bucket.name));
    this.updateBuckets();
  }

  updateTimeBackFilter(timeBackFilter: Timestamps): void {
    const currentTimestamp: string = Timestamps[timeBackFilter];
    this.timeBackFilter = Timestamps[currentTimestamp];
    this.localstorageService.setItem(this.localstorageService.TIME_BACK_FORMS, this.timeBackFilter);
    this.timeBackFilterChanged.next(this.timeBackFilter);
    this.filterForms();
  }

  updateFilterString(filterString: string): void {
    this.queryString = filterString;
    this.filterForms();
  }

  addBucket(tagId: string): void {
    const bucket1 = this.bucketsManagementService.buckets.find(bucket => bucket._id === tagId);
    this.filteredBuckets.push(bucket1);
    this.updateBuckets();
  }

  removeBucket(tagId: string): void {
    this.filteredBuckets = this.filteredBuckets.filter(bucket => bucket._id !== tagId);
    this.updateBuckets();
  }

  updateBuckets(): void {
    this.localstorageService.setItem(this.localstorageService.BUCKET_NAMES, this.filteredBuckets.map(bucket => bucket.name));
    this.filteredBucketsChanged.next(this.filteredBuckets);
    this.filterForms();
  }

  filterForms(): void {
    let filterForms = this.formsManagementService.forms?.slice();

    if (this.queryString) {
      filterForms = filterForms.filter(form => form.name.includes(this.queryString));
    }

    const filteredBucketIds = this.filteredBuckets.map(bucket => bucket._id);
    if (filteredBucketIds.length) {
      filterForms = filterForms.filter(form => {
        const tagIds = form.buckets.map(bucket => bucket._id);
        return !_some(filteredBucketIds, tagId => !tagIds.includes(tagId));
      });
    }

    if (this.timeBackFilter !== Timestamps.Forever) {
      filterForms = filterForms.filter(form => {
        const currentDatePlusDaysBack = new Date(form.creationTime);
        const wantedBackTimeFilter: number = this.timeBackFilter;
        currentDatePlusDaysBack.setDate(currentDatePlusDaysBack.getDate() + this.timeStampsToData[wantedBackTimeFilter].value);
        return Number(currentDatePlusDaysBack) > Number(Date.now());
      });
    }

    this.filteredForms = filterForms;
    this.filteredFormsChanged.next(filterForms);
  }

}
