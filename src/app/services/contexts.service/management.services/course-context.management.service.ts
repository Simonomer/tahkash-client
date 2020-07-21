import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ICourseContext} from '../../../models/course-context';
import {ContextTypes} from '../emums';
import {ContextsService} from '../index';
import {LocalstorageService} from '../../localstorage.service';

@Injectable()
export class CourseContextManagementService {

  public courseContext$: Observable<ICourseContext>;

  public set courseContext(value: ICourseContext) {
    this.contextsService.setCurrentContextValue(ContextTypes.courseContext, value);
    this.localstorageService.setItem(this.localstorageService.COURSE_CONTEXT, value);
  }

  public get courseContext(): ICourseContext {
    return this.contextsService.getCurrentContextValue(ContextTypes.courseContext);
  }

  constructor(private contextsService: ContextsService,
              private localstorageService: LocalstorageService) {
    this.courseContext$ = this.contextsService.watchSelectedContext(ContextTypes.courseContext);
  }
}

