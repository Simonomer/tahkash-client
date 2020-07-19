import {Component, Input, OnInit} from '@angular/core';
import {some as _some} from 'lodash';

import {IBucket} from '../../../models/bucket';
import {ConnectionsService} from '../../../services/connections.service';
import {Observable, Subject} from 'rxjs';
import {IForm} from '../../../models/form';
import {LocalstorageService} from '../../../services/localstorage.service';
import {Timestamps} from '../../../models/timestamp.enum';
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
  currentTimeBackFilter: Timestamps;

  bucketAdded: Subject<string>;
  bucketRemoved: Subject<string>;
  inputUpdated: Subject<string>;

  timeStampsToData = this.filterService.timeStampsToData;

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
    this.filterService.timeBackFilterChanged.subscribe(timeBackFilter => this.currentTimeBackFilter = timeBackFilter);
    this.filterService.filteredBucketsChanged.subscribe(filteredBuckets => this.currentBuckets = filteredBuckets);

    if (Timestamps[this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS)]) {
      const currentDatetimeFilter: string = this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS);
      const currentTimebackString: string = Timestamps[currentDatetimeFilter];
      this.currentTimeBackFilter = Timestamps[currentTimebackString];
    } else {
      this.currentTimeBackFilter = Timestamps[Timestamps[Timestamps.Week]];
    }

    this.filterService.updateTimeBackFilter(this.currentTimeBackFilter);
    await this.filterService.init();

    this.inputUpdated.subscribe(filterString => {
      this.filterString = filterString;
      this.filterService.updateFilterString(filterString);
    });

    this.bucketAdded.subscribe(bucketId => this.filterService.addBucket(bucketId));
    this.bucketRemoved.subscribe(bucketId => this.filterService.removeBucket(bucketId));
  }

  onTimestampChange(timestamp: string): void {
    this.filterService.updateTimeBackFilter(Timestamps[timestamp]);
  }
}
