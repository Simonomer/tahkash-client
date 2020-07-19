import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {IBucket} from '../models/bucket';
import {ContextsService} from './contexts.service';
import {ContextTypes} from './contexts.service/emums';
import {Observable} from 'rxjs';

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
              private connectionsService: ConnectionsService) {
    this.buckets$ = this.contextsService.watchSelectedContext(ContextTypes.buckets);

  }

  public async updateBucketsFromServer(): Promise<void> {
    this.buckets = await this.connectionsService.getBuckets();
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
