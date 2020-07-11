import { Component, OnInit } from '@angular/core';
import {NewFormDialogComponent} from './new-form-dialog/new-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {Subject} from 'rxjs';
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component';
import {ITag} from '../../models/tag';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  allForms: IForm[];
  filteredForms: IForm[];
  formsUpdated: Subject<any>;
  formsFiltered: Subject<IForm[]>;

  constructor(public dialog: MatDialog,
              private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.formsUpdated = new Subject<any>();
    this.formsFiltered = new Subject<any>();
    this.formsUpdated.subscribe(() => this.updateForms());
    this.formsFiltered.subscribe(forms => this.filteredForms = forms);
  }

  updateForms() {
    this.connectionsService.getAllForms().subscribe((forms: IForm[]) => {
      this.allForms = forms;
      this.filteredForms = forms;
    });
  }

  openNewFormDialog(): void {
    const dialogRef = this.dialog.open(NewFormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(formName => {
      if (formName) {
        this.connectionsService.createForm(formName).subscribe(() => this.updateForms());
      }
    });
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      height: '500px'
    });
  }

}
