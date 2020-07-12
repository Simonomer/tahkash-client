import { Component, OnInit } from '@angular/core';
import {IForm} from '../../models/form';
import {ITag} from '../../models/tag';
import {Subject} from 'rxjs';
import {ConnectionsService} from '../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TagsManagementService} from '../../services/tags.management.service';

@Component({
  selector: 'form-overview',
  templateUrl: './form-overview.component.html',
  styleUrls: ['./form-overview.component.scss']
})
export class FormOverviewComponent implements OnInit {

  formId: string;
  currentForm: IForm;
  completeTags: ITag[];

  tagRemoved: Subject<string>;
  tagAdded: Subject<string>;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router,
    private tagsManagementService: TagsManagementService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();

    this.route.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.tagsManagementService.allTagsChanged.subscribe(tags => this.completeTags = tags);
      this.connectionsService.getForm(this.formId).subscribe(form => this.currentForm = form);
    });

    this.tagAdded.subscribe(tagId => {
      if (!this.currentForm.tags.find(tag => tag._id === tagId)) {
        this.currentForm.tags.push(this.completeTags.find(tag => tag._id === tagId));
        this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
      }
    })

    this.tagRemoved.subscribe(tagId => {
      this.currentForm.tags = this.currentForm.tags.filter(tag => tag._id !== tagId);
      this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
    })
  }

  navigateTo(to: string) {
    this.router.navigate([to], {relativeTo: this.route})
  }

}
