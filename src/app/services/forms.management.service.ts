import {Injectable} from "@angular/core";
import {ConnectionsService} from "./connections.service";
import {IForm} from "../models/form";
import {Subject} from 'rxjs';

@Injectable()
export class FormsManagementService {

  filterString: string;
  forms: IForm[] = [];

  formsChanged: Subject<IForm[]> = new Subject<IForm[]>();

  constructor(private connectionsService: ConnectionsService) {
  }

  updateForms() {
    this.connectionsService.getAllForms().subscribe(forms => {
      this.forms = forms;
      this.formsChanged.next(forms);
    })
  }

  createForm(formName: string) {
    this.connectionsService.createForm(formName).subscribe(() => this.updateForms());
  }

  removeTagFromForm(tagId: string, form: IForm) {
    return this.connectionsService.modifyForm({...form, tags: form.tags.filter(tag => tag._id !== tagId)});
  }
}
