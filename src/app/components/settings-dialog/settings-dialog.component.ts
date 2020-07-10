import {Subject} from 'rxjs';
import { groupBy as _groupBy } from 'lodash';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {ITag} from '../../models/tag';
import {ConnectionsService} from '../../services/connections.service';

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

  tagAdded: Subject<ITag>;
  tagRemoved: Subject<string>;

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
              private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<ITag>();
    this.tagRemoved = new Subject<string>();
    this.updateTags();

    this.tagAdded.subscribe((tag: ITag) => {
      this.connectionsService.addTag(tag).subscribe(() => this.updateTags());
    })

    this.tagRemoved.subscribe((tagId: string) => {
      this.connectionsService.deleteTag(tagId).subscribe(() => this.updateTags());
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  updateTags() {
    this.connectionsService.getTags().subscribe(tags => {
      this.completeTags = tags;
      this.groupedByTags = _groupBy(this.completeTags, (tag: ITag) => tag.group)
    });
  }

  addTag(text, group) {
    this.tagAdded.next({text, group} as ITag);
  }
}
