import { Component, OnInit } from '@angular/core';
import {NewFormDialogComponent} from './new-form-dialog/new-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {Subject} from 'rxjs';
import {SettingsDialogComponent} from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  forms: IForm[];
  formsUpdated: Subject<any>;

  constructor(public dialog: MatDialog,
              private connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.formsUpdated = new Subject<any>();
    this.formsUpdated.subscribe(() => this.updateForms())
  }

  updateForms() {
    this.connectionsService.getAllForms().subscribe((forms: IForm[]) => this.forms = forms);
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
