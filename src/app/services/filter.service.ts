import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {FormsManagementService} from './forms.management.service';
import {BucketsManagementService} from './buckets.management.service';
import {IForm} from '../models/form';
import {IBucket} from '../models/bucket';
import {Subject} from 'rxjs';
import {LocalstorageService} from './localstorage.service';

@Injectable()
export class FilterService {

  filteredForms: IForm[] = [];
  filteredBuckets: IBucket[] = [];
  queryString: string;

  filteredFormsChanged: Subject<IForm[]> = new Subject<IForm[]>();
  filteredBucketsChanged: Subject<IBucket[]> = new Subject<IBucket[]>();

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private bucketsManagementService: BucketsManagementService,
              private localstorageService: LocalstorageService) {
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
    this.filteredBucketsChanged.next(this.filteredBuckets);
    this.filterForms();
  }

  filterForms(): void {
    let filterForms = this.formsManagementService.forms?.slice();

    if (this.queryString) {
      filterForms = filterForms.filter(form => form.name.includes(this.queryString));
    }

    this.filteredForms = filterForms;
    this.filteredFormsChanged.next(filterForms);
  }

}
