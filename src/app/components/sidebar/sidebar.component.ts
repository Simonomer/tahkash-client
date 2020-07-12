import { Component, OnInit } from '@angular/core';
import {NewFormDialogComponent} from './new-form-dialog/new-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {Subject} from 'rxjs';
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component';
import {ITag} from '../../models/tag';
import {FormsManagementService} from '../../services/forms.management.service';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  allForms: IForm[];
  filteredForms: IForm[];

  constructor(public dialog: MatDialog,
              private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private filterService: FilterService) { }

  ngOnInit(): void {
    this.formsManagementService.formsChanged.subscribe(forms => this.allForms = forms);
    this.filterService.filteredFormsChanged.subscribe(filteredForms => this.filteredForms = filteredForms);
    this.formsManagementService.updateForms();
  }

  openNewFormDialog(): void {
    const dialogRef = this.dialog.open(NewFormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(formName => {
      if (formName) {
        this.formsManagementService.createForm(formName);
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
