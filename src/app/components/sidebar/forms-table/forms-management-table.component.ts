import {Router, ActivatedRoute} from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';

import {Subject} from "rxjs";
import {ConnectionsService} from '../../../services/connections.service';
import {FormsManagementService} from '../../../services/forms.management.service';
import {IForm} from '../../../models/form';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'forms-management-table',
  templateUrl: './forms-management-table.component.html',
  styleUrls: ['./forms-management-table.component.scss']
})
export class FormsManagementTableComponent implements OnInit {

  tagDeleted: Subject<{ tagId: string, formId: string }>;
  @Input() forms: IForm[];

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.tagDeleted = new Subject<{ tagId: string, formId: string }>();
    this.tagDeleted.subscribe(obj => this.onBucketDeleted(obj.tagId, obj.formId));
    this.formsManagementService.updateForms();
  }

  formClicked(formId: string) {
    this.router.navigate([formId], {relativeTo: this.activatedRoute})
  }

  onBucketDeleted(tagId: string, formId: string) {
    this.formsManagementService.removeBucketFromForm(tagId, this.forms.find(form => form._id === formId))
      .subscribe(() => this.formsManagementService.updateForms());
  }

  onDuplicateForm(formId: string) {
    this.connectionsService.duplicateForm(formId).subscribe(() => this.formsManagementService.updateForms());
  }

  onDeleteFormClick(formId: string) {
    this.connectionsService.deleteForm(formId).subscribe(() => this.formsManagementService.updateForms());
  }

  copyToClipboardAnswerUrl(formId: string) {
    const angularRoute = this.router.url;
    const fullUrl = window.location.href;
    const domainUrl = fullUrl.replace(angularRoute, '');
    this.clipboard.copy(`${domainUrl}/answer/${formId}`)
  }
}
