import {Component, OnInit} from '@angular/core';
import {IForm} from '../../../../models/form';
import {Observable, Subject} from 'rxjs';
import {IBucket} from '../../../../models/bucket';
import {ConnectionsService} from '../../../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BucketsManagementService} from '../../../../services/contexts.service/management.services/buckets.management.service';
import {QuestionsManagementService} from '../../../../services/contexts.service/management.services/questions.management.service';

@Component({
  selector: 'form-overview',
  templateUrl: './form-overview.component.html',
  styleUrls: ['./form-overview.component.scss']
})
export class FormOverviewComponent implements OnInit {

  formId: string;
  currentForm: IForm;
  buckets$: Observable<IBucket[]>;

  bucketRemoved: Subject<string>;
  bucketAdded: Subject<string>;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router,
    private bucketsManagementService: BucketsManagementService,
    private questionsManagementService: QuestionsManagementService) {
  }

  async ngOnInit(): Promise<void> {
    this.bucketAdded = new Subject<string>();
    this.bucketRemoved = new Subject<string>();
    this.buckets$ = this.bucketsManagementService.buckets$;
    await this.bucketsManagementService.updateBucketsFromServer();

    this.route.paramMap.subscribe(async paramsMap => {
      this.formId = paramsMap.get('formId');
      this.currentForm = await this.connectionsService.getForm(this.formId);
    });

    this.bucketAdded.subscribe(async bucketId => {
      if (!this.currentForm.buckets.find(bucket => bucket._id === bucketId)) {
        const bucket = this.bucketsManagementService.buckets.find(currentBucket => currentBucket._id === bucketId);
        this.currentForm.buckets.push(bucket);
        this.currentForm = await this.connectionsService.modifyForm(this.currentForm);
        await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
      }
    });

    this.bucketRemoved.subscribe(async bucketId => {
      this.currentForm.buckets = this.currentForm.buckets.filter(bucket => bucket._id !== bucketId);
      this.currentForm = await this.connectionsService.modifyForm(this.currentForm);
      await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
    });
  }

  navigateTo(to: string): void {
    this.router.navigate([to], {relativeTo: this.route});
  }
}
