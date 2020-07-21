import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NewItemDialogComponent} from './new-item-dialog/new-item-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IHasIdAndName} from '../../models/has-name-id';
import {IActionHandler} from './interfaces';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  _items: IHasIdAndName[];
  get items(): IHasIdAndName[] {
    return this._items;
  }

  @Input() set items(value: IHasIdAndName[]) {
    this._items = null; // so the search bar catches the change
    this._items = value;
  }

  filteredItems: IHasIdAndName[];
  @Output() action = new EventEmitter<IActionHandler>();

  constructor(public dialog: MatDialog) {
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

    dialogRef.afterClosed().subscribe((data: {name: string, course: string, week: string}) => {
      if (data) {
        this.action.emit({params: {
          name: data.name,
            courseContext: {
            course: data.course
              , week: data.week
          }}, action: 'Create'} as IActionHandler);
      }
    });
  }
}
