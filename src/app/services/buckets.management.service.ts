import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {IBucket} from '../models/bucket';
import {Subject} from 'rxjs';

@Injectable()
export class BucketsManagementService {

  allBuckets: IBucket[];

  allBucketsChanged: Subject<IBucket[]> = new Subject<IBucket[]>();

  constructor(private connectionsService: ConnectionsService) {
    this.updateBuckets();
  }

  updateBuckets() {
    this.connectionsService.getBuckets().subscribe(buckets => {
      this.allBuckets = buckets;
      this.allBucketsChanged.next(buckets);
    })
  }

  deleteBucket(tagId: string) {
    this.connectionsService.deleteBucket(tagId).subscribe(() => this.updateBuckets());
  }

  addBucket(text: string, group?: string) {
    this.connectionsService.addBucket({text, group} as IBucket).subscribe(() => this.updateBuckets());
  }
}
