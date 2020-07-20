import {Component, OnInit} from '@angular/core';
import {IBucket} from './models/bucket';
import {chain as _chain} from 'lodash';
import {BucketsManagementService} from './services/contexts.service/management.services/buckets.management.service';
import {CourseToWeeksManagementService} from './services/contexts.service/management.services/course-to-weeks.management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private bucketsManagementService: BucketsManagementService,
              private courseToWeeksManagementService: CourseToWeeksManagementService) {
  }

  ngOnInit(): void {
    this.bucketsManagementService.buckets$.subscribe((buckets: IBucket[]) => {
      const allCourseContext = buckets?.map((courseContext) => ({course: courseContext.course, week: courseContext.week}));

      this.courseToWeeksManagementService.courseToWeeksDictionary = _chain(allCourseContext)
        .uniq()
        .groupBy('course')
        .mapValues(v => v.map(obj => obj.week))
        .value();
    });
  }

}
