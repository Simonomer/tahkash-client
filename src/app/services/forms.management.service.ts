import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {IForm} from '../models/form';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FormsManagementService {

  forms: IForm[] = [];

  formsChanged: Subject<IForm[]> = new Subject<IForm[]>();

  constructor(private connectionsService: ConnectionsService) {
  }

  updateForms() {
    this.connectionsService.getAllForms().subscribe(forms => {
      this.forms = forms;
      this.formsChanged.next(forms);
    });
  }

  createForm(formName: string): void {
    this.connectionsService.createForm(formName).subscribe(() => this.updateForms());
  }

  removeBucketFromForm(tagId: string, form: IForm): Observable<IForm> {
    return this.connectionsService.modifyForm({...form, buckets: form.buckets.filter(bucket => bucket._id !== tagId)});
  }
}
