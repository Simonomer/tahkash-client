import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ContextsService} from '../index';
import {IBucket} from '../../../models/bucket';
import {ConnectionsService} from '../../connections.service';
import {ContextTypes} from '../emums';
import {CourseContextManagementService} from './course-context.management.service';

@Injectable()
export class BucketsManagementService {

  public buckets$: Observable<IBucket[]>;

  public set buckets(value: IBucket[]) {
    this.contextsService.setCurrentContextValue(ContextTypes.buckets, value);
  }

  public get buckets(): IBucket[] {
    return this.contextsService.getCurrentContextValue(ContextTypes.buckets);
  }

  constructor(private contextsService: ContextsService,
              private connectionsService: ConnectionsService,
              private courseContextManagementService: CourseContextManagementService) {
    this.buckets$ = this.contextsService.watchSelectedContext(ContextTypes.buckets);
  }

  public async updateBucketsFromServer(): Promise<void> {
    this.buckets = await this.connectionsService.searchBuckets(this.courseContextManagementService.courseContext);
  }

  public async deleteBucket(bucketId: string): Promise<void> {
    await this.connectionsService.deleteBucket(bucketId);
    await this.updateBucketsFromServer();
  }

  async createBucket(name: string): Promise<void> {
    await this.connectionsService.addBucket(name);
    await this.updateBucketsFromServer();
  }
}
