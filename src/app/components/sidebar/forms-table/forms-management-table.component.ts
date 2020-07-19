import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';

import {ConnectionsService} from '../../../services/connections.service';
import {FormsManagementService} from '../../../services/forms.management.service';
import {IForm} from '../../../models/form';
import {Clipboard} from '@angular/cdk/clipboard';
import {Subject} from 'rxjs';

@Component({
  selector: 'forms-management-table',
  templateUrl: './forms-management-table.component.html',
  styleUrls: ['./forms-management-table.component.scss']
})
export class FormsManagementTableComponent implements OnInit {

  bucketDeleted: Subject<{ tagId: string, formId: string }>;
  @Input() forms: IForm[];

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.bucketDeleted = new Subject<{ tagId: string, formId: string }>();
    this.bucketDeleted.subscribe(obj => this.onBucketDeleted(obj.tagId, obj.formId));
  }

  formClicked(formId: string): void {
    this.router.navigate([formId], {relativeTo: this.activatedRoute});
  }

  async onBucketDeleted(bucketId: string, formId: string): Promise<void> {
    await this.formsManagementService.removeBucketFromForm(bucketId, this.forms.find(form => form._id === formId));
  }

  async onDuplicateForm(formId: string): Promise<void> {
    await this.connectionsService.duplicateForm(formId);
  }

  async onDeleteFormClick(formId: string): Promise<void> {
    await this.connectionsService.deleteForm(formId);
  }

  copyToClipboardAnswerUrl(formId: string): void {
    const angularRoute = this.router.url;
    const fullUrl = window.location.href;
    const domainUrl = fullUrl.replace(angularRoute, '');
    this.clipboard.copy(`${domainUrl}/answer/${formId}`);
  }
}
