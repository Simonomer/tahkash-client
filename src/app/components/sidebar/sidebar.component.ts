import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewItemDialogComponent} from './new-item-dialog/new-item-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {FormsManagementService} from '../../services/forms.management.service';
import {Observable} from 'rxjs';
import {IHasIdAndName} from '../../models/has-name';
import {IActionHandler} from './interfaces';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  _items: IHasIdAndName[];
  @Input() get items(): IHasIdAndName[] { return this._items };
  set items(value: IHasIdAndName[]) { this._items = value; }

  filteredItems: IHasIdAndName[];
  @Output() action = new EventEmitter<IActionHandler>()

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredItems = this.items;
  }

  onAction(action: IActionHandler): void {
    this.action.emit(action);
  }

  onFilterForms(filteredItems: IHasIdAndName[]): void {
    this.filteredItems = filteredItems;
  }

  openNewItemDialog(): void {
    const dialogRef = this.dialog.open(NewItemDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        this.action.emit({param: name, action: 'Create'})
      }
    });
  }
}
