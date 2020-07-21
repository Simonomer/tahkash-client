import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IBucket} from '../../../models/bucket';
import {BucketsManagementService} from '../../../services/contexts.service/management.services/buckets.management.service';
import {CourseContextManagementService} from '../../../services/contexts.service/management.services/course-context.management.service';
import {ActionType, IActionHandler} from '../../../components/sidebar/interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {ICourseContext} from '../../../models/course-context';

@Component({
  selector: 'app-buckets-editor',
  templateUrl: './buckets-editor-page.component.html',
  styleUrls: ['./buckets-editor-page.component.scss']
})
export class BucketsEditorPageComponent implements OnInit {

  private readonly actionToFunction: Record<ActionType, (params: { }) => void> =
    {
      'Create': (params: { name: string, courseContext: ICourseContext }) => this.bucketsManagementService.createBucket(params.name, params.courseContext),
      'Clicked': (_id: string) => this.router.navigate([_id], {relativeTo: this.activatedRoute}),
      'Delete': (_id: string) => this.bucketsManagementService.deleteBucket(_id)
    };

  buckets$: Observable<IBucket[]>;
  courseContextSubscription: Subscription;

  constructor(private bucketsManagementService: BucketsManagementService,
              private courseContextManagementService: CourseContextManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.courseContextSubscription = this.courseContextManagementService.courseContext$.subscribe(() =>
      this.bucketsManagementService.updateBucketsFromServer());
    await this.bucketsManagementService.updateBucketsFromServer();
    this.buckets$ = this.bucketsManagementService.buckets$;
  }

  onAction(action: IActionHandler): void {
    this.actionToFunction[action.action](action.params);
  }

  ngOnDestroy(): void {
    this.courseContextSubscription.unsubscribe();
  }

}
