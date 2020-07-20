import { Component, OnInit } from '@angular/core';
import {ConnectionsService} from '../../../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BucketsManagementService} from '../../../../services/contexts.service/management.services/buckets.management.service';
import {IBucket} from '../../../../models/bucket';
import {Observable} from 'rxjs';
import {find, first, switchMap, take, map} from 'rxjs/operators';

@Component({
  selector: 'app-bucket-overview',
  templateUrl: './bucket-overview.component.html',
  styleUrls: ['./bucket-overview.component.scss']
})
export class BucketOverviewComponent implements OnInit {

  bucketId: string;
  currentBucket$: Observable<IBucket>;

  constructor(private bucketsManagementService: BucketsManagementService,
              private connectionsService: ConnectionsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramsMap => {
      this.bucketId = paramsMap.get('bucketId');
      this.currentBucket$ = this.bucketsManagementService.buckets$.pipe(map(buckets => buckets.find(bucket => bucket._id === this.bucketId)));
    });
  }

}
