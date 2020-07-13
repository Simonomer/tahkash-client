import { Component, OnInit } from '@angular/core';
import {IForm} from '../../models/form';
import {IBucket} from '../../models/bucket';
import {Subject} from 'rxjs';
import {ConnectionsService} from '../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BucketsManagementService} from '../../services/buckets.management.service';

@Component({
  selector: 'form-overview',
  templateUrl: './form-overview.component.html',
  styleUrls: ['./form-overview.component.scss']
})
export class FormOverviewComponent implements OnInit {

  formId: string;
  currentForm: IForm;
  completeBuckets: IBucket[];

  tagRemoved: Subject<string>;
  tagAdded: Subject<string>;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router,
    private bucketsManagementService: BucketsManagementService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();

    this.route.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.bucketsManagementService.allBucketsChanged.subscribe(buckets => this.completeBuckets = buckets);
      this.connectionsService.getForm(this.formId).subscribe(form => this.currentForm = form);
    });

    this.tagAdded.subscribe(tagId => {
      if (!this.currentForm.buckets.find(bucket => bucket._id === tagId)) {
        this.currentForm.buckets.push(this.completeBuckets.find(bucket => bucket._id === tagId));
        this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
      }
    })

    this.tagRemoved.subscribe(tagId => {
      this.currentForm.buckets = this.currentForm.buckets.filter(bucket => bucket._id !== tagId);
      this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
    })
  }

  navigateTo(to: string) {
    this.router.navigate([to], {relativeTo: this.route})
  }

}
