import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {CourseToWeeksDictionary, ICourseContext} from '../../models/course-context';
import {CourseContextManagementService} from '../../services/contexts.service/management.services/course-context.management.service';
import {CourseToWeeksManagementService} from '../../services/contexts.service/management.services/course-to-weeks.management.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  courseContext$: Observable<ICourseContext>;
  courseToWeeksDictionary$: Observable<CourseToWeeksDictionary>;
  weekOptions$: Observable<string[]>;
  courseOptions$: Observable<string[]>;

  get selectedWeek(): string {
    return this.courseContextManagementService.courseContext?.week;
  };

  set selectedWeek(value: string) {
    this.courseContextManagementService.courseContext = {...this.courseContextManagementService.courseContext, week: value};
  }

  get selectedCourse(): string {
    return this.courseContextManagementService.courseContext?.course;
  };

  set selectedCourse(value: string) {
    this.courseContextManagementService.courseContext = {...this.courseContextManagementService.courseContext, course: value};
  }

  constructor(private courseContextManagementService: CourseContextManagementService,
              private courseToWeeksManagementService: CourseToWeeksManagementService) {
    this.courseContextManagementService.courseContext = { course: '', week: '' }
    this.courseContext$ = this.courseContextManagementService.courseContext$;
    this.courseToWeeksDictionary$ = this.courseToWeeksManagementService.courseToWeeksDictionary$;

    this.weekOptions$ = this.courseToWeeksDictionary$.pipe(map((courseToWeeksDictionary) => {
      return courseToWeeksDictionary[this.courseContextManagementService.courseContext.course];
    }));

    this.courseOptions$ = this.courseToWeeksDictionary$.pipe(map((courseToWeeksDictionary) => {
      return Object.keys(courseToWeeksDictionary);
    }));
  }

  ngOnInit(): void {

  }

}
