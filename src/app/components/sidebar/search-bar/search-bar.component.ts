import {Component, Input, OnInit} from '@angular/core';
import {some as _some} from 'lodash';

import {IBucket} from '../../../models/bucket';
import {ConnectionsService} from '../../../services/connections.service';
import {Subject} from 'rxjs';
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

  allBuckets: IBucket[];
  currentBuckets: IBucket[];
  filterString: string;
  currentTimeBackFilter: Timestamps;

  tagAdded: Subject<string>;
  tagRemoved: Subject<string>;
  inputUpdated: Subject<string>;

  timeStampsToData = this.filterService.timeStampsToData;

  constructor(private connectionsService: ConnectionsService,
              private localstorageService: LocalstorageService,
              private formsManagementService: FormsManagementService,
              private filterService: FilterService,
              private bucketsManagementService: BucketsManagementService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();
    this.inputUpdated = new Subject<string>();

    this.bucketsManagementService.allBucketsChanged.subscribe(buckets => this.allBuckets = buckets);
    this.filterService.timeBackFilterChanged.subscribe(timeBackFilter => this.currentTimeBackFilter = timeBackFilter);
    this.filterService.filteredBucketsChanged.subscribe(filteredBuckets => this.currentBuckets = filteredBuckets);

    if (Timestamps[this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS)]) {
      const currentDatetimeFilter: string = this.localstorageService.getByKey(this.localstorageService.TIME_BACK_FORMS);
      const currentTimebackString: string = Timestamps[currentDatetimeFilter];
      this.currentTimeBackFilter = Timestamps[currentTimebackString];
    } else {
      this.currentTimeBackFilter = Timestamps[Timestamps[Timestamps.Week]];
    }

    this.filterService.updateTimeBackFilter(this.currentTimeBackFilter)
    this.filterService.init();

    this.inputUpdated.subscribe(filterString => {
      this.filterString = filterString;
      this.filterService.updateFilterString(filterString);
    });

    this.tagAdded.subscribe(tagId => this.filterService.addBucket(tagId));
    this.tagRemoved.subscribe(tagId => this.filterService.removeBucket(tagId));
  }

  onTimestampChange(timestamp: string) {
    this.filterService.updateTimeBackFilter(Timestamps[timestamp]);
  }
}
