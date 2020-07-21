import {merge, Observable, zip} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {CourseToWeeksDictionary, ICourseContext} from '../../models/course-context';
import {CourseContextManagementService} from '../../services/contexts.service/management.services/course-context.management.service';
import {CourseToWeeksManagementService} from '../../services/contexts.service/management.services/course-to-weeks.management.service';
import {map, combineAll, combineLatest} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalstorageService} from '../../services/localstorage.service';

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
    this.courseContextManagementService.courseContext = { course: value };
  }

  constructor(private courseContextManagementService: CourseContextManagementService,
              private courseToWeeksManagementService: CourseToWeeksManagementService,
              private router: Router,
              private localstorageService: LocalstorageService) {
    this.courseContextManagementService.courseContext = localstorageService.getByKey(this.localstorageService.COURSE_CONTEXT) || { };
    this.courseContext$ = this.courseContextManagementService.courseContext$;
    this.courseToWeeksDictionary$ = this.courseToWeeksManagementService.courseToWeeksDictionary$;
  }

  ngOnInit(): void {
    this.courseOptions$ = this.courseToWeeksDictionary$.pipe(map((courseToWeeksDictionary) => {
      return Object.keys(courseToWeeksDictionary || {});
    }));

    this.weekOptions$ = merge(this.courseContextManagementService.courseContext$, this.courseToWeeksDictionary$).pipe(map(() => {
      const courseContext = this.courseContextManagementService.courseContext;
      if (courseContext?.course && this.courseToWeeksManagementService.courseToWeeksDictionary) {
        return this.courseToWeeksManagementService.courseToWeeksDictionary[courseContext.course];
      }
    }));
  }

  navigateTo(to: string) {
    this.router.navigate(['editor', to])
  }

}
