import {Router, ActivatedRoute} from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';

import {Subject} from "rxjs";
import {ConnectionsService} from '../../../services/connections.service';
import {FormsManagementService} from '../../../services/forms.management.service';
import {IForm} from '../../../models/form';

@Component({
  selector: 'forms-management-table',
  templateUrl: './forms-management-table.component.html',
  styleUrls: ['./forms-management-table.component.scss']
})
export class FormsManagementTableComponent implements OnInit {

  tagDeleted: Subject<{ tagId: string, formId: string }>;
  @Input() forms: IForm[];
  @Input() updateForms: Subject<any>;

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagDeleted = new Subject<{ tagId: string, formId: string }>();
    this.tagDeleted.subscribe(obj => this.onTagDeleted(obj.tagId, obj.formId));
    this.updateForms.next();
  }

  formClicked(formId: string) {
    this.router.navigate([formId], {relativeTo: this.activatedRoute})
  }

  onTagDeleted(tagId: string, formId: string) {
    this.formsManagementService.removeTagFromForm(tagId, this.forms.find(form => form._id === formId))
      .subscribe(() => this.updateForms.next());
  }

  onDuplicateForm(formId: string) {
    this.connectionsService.duplicateForm(formId).subscribe(() => this.updateForms.next());
  }

  onDeleteFormClick(formId: string) {
    this.connectionsService.deleteForm(formId).subscribe(() => this.updateForms.next());
  }

}
