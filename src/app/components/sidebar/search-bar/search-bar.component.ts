import {Component, Input, OnInit} from '@angular/core';
import {some as _some} from 'lodash';

import {ITag} from '../../../models/tag';
import {ConnectionsService} from '../../../services/connections.service';
import {Subject} from 'rxjs';
import {IForm} from '../../../models/form';
import {LocalstorageService} from '../../../services/localstorage.service';
import {Timestamps} from '../../../models/timestamp.enum';
import {FormsManagementService} from '../../../services/forms.management.service';
import {FilterService} from '../../../services/filter.service';
import {TagsManagementService} from '../../../services/tags.management.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  allTags: ITag[];
  currentTags: ITag[];
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
              private tagsManagementService: TagsManagementService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();
    this.inputUpdated = new Subject<string>();

    this.tagsManagementService.allTagsChanged.subscribe(tags => this.allTags = tags);
    this.filterService.timeBackFilterChanged.subscribe(timeBackFilter => this.currentTimeBackFilter = timeBackFilter);
    this.filterService.filteredTagsChanged.subscribe(filteredTags => this.currentTags = filteredTags);

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

    this.tagAdded.subscribe(tagId => this.filterService.addTag(tagId));
    this.tagRemoved.subscribe(tagId => this.filterService.removeTag(tagId));
  }

  onTimestampChange(timestamp: string) {
    this.filterService.updateTimeBackFilter(Timestamps[timestamp]);
  }
}
