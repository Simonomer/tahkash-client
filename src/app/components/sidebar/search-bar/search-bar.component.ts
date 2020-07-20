import {Component, EventEmitter, Input, Output} from '@angular/core';

import {IHasIdAndName} from '../../../models/has-name-id';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  _items: IHasIdAndName[];
  get items(): IHasIdAndName[] {
    return this._items;
  };

  @Input()
  set items(value: IHasIdAndName[]) {
    this._items = value;
    this.onFilterStringChange(this._filterString);
  }

  @Output() onFilterFormsChange = new EventEmitter<IHasIdAndName[]>();

  _filterString: string = '';
  get filterString(): string {
    return this._filterString;
  };

  set filterString(value: string) {
    this._filterString = value;
    this.onFilterStringChange(value);
  }

  onFilterStringChange(value: string) {
    const filteredItems = this.items?.filter(item => item.name.includes(value));
    this.onFilterFormsChange.emit(filteredItems);
  }

}
