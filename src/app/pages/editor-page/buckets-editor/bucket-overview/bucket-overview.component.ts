import { Component, OnInit } from '@angular/core';
import {ConnectionsService} from '../../../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BucketsManagementService} from '../../../../services/contexts.service/management.services/buckets.management.service';
import {IBucket} from '../../../../models/bucket';

@Component({
  selector: 'app-bucket-overview',
  templateUrl: './bucket-overview.component.html',
  styleUrls: ['./bucket-overview.component.scss']
})
export class BucketOverviewComponent implements OnInit {

  bucketId: string;
  currentBucket: IBucket;

  constructor(private connectionsService: ConnectionsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async paramsMap => {
      this.bucketId = paramsMap.get('bucketId');
      const bucket = await this.connectionsService.getForm(this.bucketId);
      this.currentBucket = bucket;
    });
  }

}
