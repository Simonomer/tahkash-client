import {Component, OnInit} from '@angular/core';
import {chain as _chain, isEqual as _isEqual} from 'lodash';
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
      .uniqWith(_isEqual)
      .groupBy('course')
      .mapValues(v => v.map(obj => obj.week))
      .omit(undefined)
      .value();
  }

}
