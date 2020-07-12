import { groupBy as _groupBy } from 'lodash';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {ITag} from '../../models/tag';
import {ConnectionsService} from '../../services/connections.service';
import {TagsManagementService} from '../../services/tags.management.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  GROUP_BY = ['pluga', 'team', 'general'];
  removable = true;
  completeTags: ITag[];
  groupedByTags: { [groupName: string]: ITag[] } = {};

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
              private connectionsService: ConnectionsService,
              private tagsManagementService: TagsManagementService) { }

  ngOnInit(): void {
    this.tagsManagementService.updateTags();
    this.tagsManagementService.allTagsChanged.subscribe(tags => {
      this.matchTags(tags);
    })
  }

  matchTags(tags: ITag[]) {
    this.completeTags = tags;
    this.groupedByTags = _groupBy(this.completeTags, (tag: ITag) => tag.group);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  deleteTag(tagId: string) {
    this.tagsManagementService.deleteTag(tagId);
  }

  addTag(text, group) {
    this.tagsManagementService.addTag(text, group);
  }
}
