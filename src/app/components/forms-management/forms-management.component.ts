import {Router, ActivatedRoute} from "@angular/router";
import { Component, OnInit } from '@angular/core';

import {Subject} from "rxjs";
import {IForm} from "../../models/form";
import {ConnectionsService} from "../../services/connections.service";

@Component({
  selector: 'forms-management',
  templateUrl: './forms-management.component.html',
  styleUrls: ['./forms-management.component.scss']
})
export class FormsManagementComponent implements OnInit {

  forms: IForm[];
  tagDeleted: Subject<{ tagId: string, formId: string }>;

  constructor(private connectionsService: ConnectionsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagDeleted = new Subject<{ tagId: string, formId: string }>();
    this.tagDeleted.subscribe(obj => this.onTagDeleted(obj.tagId, obj.formId));
    this.updateForms();
  }

  updateForms() {
    this.connectionsService.getAllForms().subscribe((forms: IForm[]) => this.forms = forms);
  }

  formClicked(formId: string) {
    this.router.navigate([formId], {relativeTo: this.activatedRoute})
  }

  onTagDeleted(tagId, formId) {
    this.connectionsService.removeTagFromForm(tagId, this.forms.find(form => form._id === formId))
      .subscribe(() => this.updateForms());
  }

}
