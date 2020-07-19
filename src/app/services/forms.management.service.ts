import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {IForm} from '../models/form';
import {Observable} from 'rxjs';
import {ContextTypes} from './contexts.service/emums';
import {ContextsService} from './contexts.service';

@Injectable()
export class FormsManagementService {

  public forms$: Observable<IForm[]>;

  public set forms(value: IForm[]) {
    this.contextsService.setCurrentContextValue(ContextTypes.forms, value);
  }

  public get forms(): IForm[] {
    return this.contextsService.getCurrentContextValue(ContextTypes.forms);
  }

  constructor(private contextsService: ContextsService,
              private connectionsService: ConnectionsService) {
    this.forms$ = this.contextsService.watchSelectedContext(ContextTypes.forms);
  }

  public async updateFormsFromServer(): Promise<void> {
    this.forms = await this.connectionsService.getAllForms();
  }

  public async deleteForm(formId: string): Promise<void> {
    await this.connectionsService.deleteForm(formId);
    await this.updateFormsFromServer();
  }

  async createForm(name: string): Promise<void> {
    await this.connectionsService.createForm(name);
    await this.updateFormsFromServer();
  }

  async removeBucketFromForm(bucketId: string, form: IForm): Promise<IForm> {
    const result = await this.connectionsService.modifyForm({...form, buckets: form.buckets.filter(bucket => bucket._id !== bucketId)});
    await this.updateFormsFromServer();
    return result;
  }
}
