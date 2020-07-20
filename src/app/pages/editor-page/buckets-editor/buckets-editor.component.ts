import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IBucket} from '../../../models/bucket';
import {BucketsManagementService} from '../../../services/contexts.service/management.services/buckets.management.service';
import {CourseContextManagementService} from '../../../services/contexts.service/management.services/course-context.management.service';
import {ActionType, IActionHandler} from '../../../components/sidebar/interfaces';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-buckets-editor',
  templateUrl: './buckets-editor.component.html',
  styleUrls: ['./buckets-editor.component.scss']
})
export class BucketsEditorComponent implements OnInit {

  private readonly actionToFunction: Record<ActionType, (param: string) => void> =
    {
      'Create': (bucketName: string) => this.bucketsManagementService.createBucket(bucketName),
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
    this.actionToFunction[action.action](action.param);
  }

  ngOnDestroy(): void {
    this.courseContextSubscription.unsubscribe();
  }

}
