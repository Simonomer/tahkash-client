import {ActivatedRoute, Router} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ConnectionsService} from '../../../services/connections.service';
import {FormsManagementService} from '../../../services/forms.management.service';
import {Clipboard} from '@angular/cdk/clipboard';
import {IHasIdAndName} from '../../../models/has-name';
import {IActionHandler} from '../interfaces';

@Component({
  selector: 'items-management-table',
  templateUrl: './items-management-table.component.html',
  styleUrls: ['./items-management-table.component.scss']
})
export class ItemsManagementTableComponent {

  @Input() items: IHasIdAndName[];
  @Output() action = new EventEmitter<IActionHandler>()

  constructor(private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private clipboard: Clipboard) { }

  formClicked(id: string): void {
    this.action.emit( { param: id, action: 'Clicked' })
  }

  async onDeleteFormClick(id: string): Promise<void> {
    this.action.emit({ param: id, action: 'Delete' });
  }

  copyToClipboardAnswerUrl(formId: string): void {
    const angularRoute = this.router.url;
    const fullUrl = window.location.href;
    const domainUrl = fullUrl.replace(angularRoute, '');
    this.clipboard.copy(`${domainUrl}/answer/${formId}`);
  }
}
