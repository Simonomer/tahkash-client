import {Component, Input, OnInit} from '@angular/core';

import {IBucket} from '../../../models/bucket';
import {ConnectionsService} from '../../../services/connections.service';
import {Observable, Subject} from 'rxjs';
import {LocalstorageService} from '../../../services/localstorage.service';
import {FormsManagementService} from '../../../services/forms.management.service';
import {FilterService} from '../../../services/filter.service';
import {BucketsManagementService} from '../../../services/buckets.management.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  buckets$: Observable<IBucket[]>;
  currentBuckets: IBucket[];
  filterString: string;

  bucketAdded: Subject<string>;
  bucketRemoved: Subject<string>;
  inputUpdated: Subject<string>;

  constructor(private connectionsService: ConnectionsService,
              private localstorageService: LocalstorageService,
              private formsManagementService: FormsManagementService,
              private filterService: FilterService,
              private bucketsManagementService: BucketsManagementService) { }

  async ngOnInit(): Promise<void> {
    this.bucketAdded = new Subject<string>();
    this.bucketRemoved = new Subject<string>();
    this.inputUpdated = new Subject<string>();

    this.buckets$ = this.bucketsManagementService.buckets$;
    this.filterService.filteredBucketsChanged.subscribe(filteredBuckets => this.currentBuckets = filteredBuckets);

    await this.filterService.filterForms();

    this.inputUpdated.subscribe(filterString => {
      this.filterString = filterString;
      this.filterService.updateFilterString(filterString);
    });

    this.bucketAdded.subscribe(bucketId => this.filterService.addBucket(bucketId));
    this.bucketRemoved.subscribe(bucketId => this.filterService.removeBucket(bucketId));
  }
}
