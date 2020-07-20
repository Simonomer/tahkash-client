import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CourseToWeeksDictionary} from '../../../models/course-context';
import {ContextTypes} from '../emums';
import {ContextsService} from '../index';

@Injectable()
export class CourseToWeeksManagementService {

  public courseToWeeksDictionary$: Observable<CourseToWeeksDictionary>;

  public set courseToWeeksDictionary(value: CourseToWeeksDictionary) {
    this.contextsService.setCurrentContextValue(ContextTypes.CourseToWeeksDictionary, value);
  }

  public get courseToWeeksDictionary(): CourseToWeeksDictionary {
    return this.contextsService.getCurrentContextValue(ContextTypes.CourseToWeeksDictionary);
  }

  constructor(private contextsService: ContextsService) {
    this.courseToWeeksDictionary$ = this.contextsService.watchSelectedContext(ContextTypes.CourseToWeeksDictionary);
  }
}

