import {Injectable} from "@angular/core";
import {ConnectionsService} from "./connections.service";
import {IForm} from "../models/form";

@Injectable()
export class FormsManagementService {
  constructor(private connectionsService: ConnectionsService) {
  }

  removeTagFromForm(tagId: string, form: IForm) {
    return this.connectionsService.modifyForm({...form, tags: form.tags.filter(tag => tag._id !== tagId)});
  }
}
