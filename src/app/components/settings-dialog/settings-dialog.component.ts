import { groupBy as _groupBy } from 'lodash';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {IBucket} from '../../models/bucket';
import {ConnectionsService} from '../../services/connections.service';
import {BucketsManagementService} from '../../services/buckets.management.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  GROUP_BY = ['pluga', 'team', 'general'];
  removable = true;
  completeBuckets: IBucket[];
  groupedByBuckets: { [groupName: string]: IBucket[] } = {};

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
              private connectionsService: ConnectionsService,
              private bucketsManagementService: BucketsManagementService) { }

  ngOnInit(): void {
    this.bucketsManagementService.updateBuckets();
    this.bucketsManagementService.allBucketsChanged.subscribe(buckets => {
      this.matchBuckets(buckets);
    })
  }

  matchBuckets(buckets: IBucket[]) {
    this.completeBuckets = buckets;
    this.groupedByBuckets = _groupBy(this.completeBuckets, (bucket: IBucket) => bucket.group);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  deleteBucket(tagId: string) {
    this.bucketsManagementService.deleteBucket(tagId);
  }

  addBucket(text, group) {
    this.bucketsManagementService.addBucket(text, group);
  }
}
