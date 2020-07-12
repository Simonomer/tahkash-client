import {Injectable} from '@angular/core';
import {ConnectionsService} from './connections.service';
import {ITag} from '../models/tag';
import {Subject} from 'rxjs';

@Injectable()
export class TagsManagementService {

  allTags: ITag[];

  allTagsChanged: Subject<ITag[]> = new Subject<ITag[]>();

  constructor(private connectionsService: ConnectionsService) {
    this.updateTags();
  }

  updateTags() {
    this.connectionsService.getTags().subscribe(tags => {
      this.allTags = tags;
      this.allTagsChanged.next(tags);
    })
  }

  deleteTag(tagId: string) {
    this.connectionsService.deleteTag(tagId).subscribe(() => this.updateTags());
  }

  addTag(text: string, group?: string) {
    this.connectionsService.addTag({text, group} as ITag).subscribe(() => this.updateTags());
  }
}
