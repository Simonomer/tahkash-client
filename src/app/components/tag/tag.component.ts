import {Component, Input, OnInit} from '@angular/core';
import {ITag} from "../../models/tag";
import {ConnectionsService} from "../../services/connections.service";
import {Subject} from "rxjs";

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() tag: ITag;
  @Input() formId: string;
  @Input() tagDeleted: Subject<any>;

  constructor(private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
  }

  onRemoveClick() {
    this.tagDeleted.next({tagId: this.tag._id, formId: this.formId});
  }

}
