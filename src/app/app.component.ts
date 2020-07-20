import {Component, OnInit} from '@angular/core';
import {IBucket} from './models/bucket';
import {chain as _chain} from 'lodash';
import {BucketsManagementService} from './services/contexts.service/management.services/buckets.management.service';
import {CourseToWeeksManagementService} from './services/contexts.service/management.services/course-to-weeks.management.service';
import {ConnectionsService} from './services/connections.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private connectionsService: ConnectionsService,
              private courseToWeeksManagementService: CourseToWeeksManagementService) {
  }

  async ngOnInit(): Promise<void> {
    const buckets = await this.connectionsService.getBuckets();
    const allCourseContext = buckets?.map((courseContext) => ({course: courseContext.course, week: courseContext.week}));
    this.courseToWeeksManagementService.courseToWeeksDictionary = _chain(allCourseContext)
      .uniq()
      .groupBy('course')
      .mapValues(v => v.map(obj => obj.week))
      .omit(undefined)
      .value();
  }

}
