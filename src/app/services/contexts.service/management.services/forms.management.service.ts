import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseContextManagementService} from './course-context.management.service';
import {ContextsService} from '../index';
import {ConnectionsService} from '../../connections.service';
import {ContextTypes} from '../emums';
import {IForm} from '../../../models/form';
import {ICourseContext} from '../../../models/course-context';

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
              private courseContextManagementService: CourseContextManagementService,
              private connectionsService: ConnectionsService) {
    this.forms$ = this.contextsService.watchSelectedContext(ContextTypes.forms);
  }

  public async updateFormsFromServer(): Promise<void> {
    this.forms = await this.connectionsService.searchForms(this.courseContextManagementService.courseContext);
  }

  public async deleteForm(formId: string): Promise<void> {
    await this.connectionsService.deleteForm(formId);
    await this.updateFormsFromServer();
  }

  async createForm(name: string, courseContext: ICourseContext): Promise<void> {
    await this.connectionsService.createForm({...courseContext, name} as IForm);
    await this.updateFormsFromServer();
  }

  async removeBucketFromForm(bucketId: string, form: IForm): Promise<IForm> {
    const result = await this.connectionsService.modifyForm({...form, buckets: form.buckets.filter(bucket => bucket._id !== bucketId)});
    await this.updateFormsFromServer();
    return result;
  }
}
