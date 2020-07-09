import { Component, OnInit } from '@angular/core';
import {NewFormDialog} from './new-form-dialog/new-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {Subject} from 'rxjs';

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

  openDialog(): void {
    const dialogRef = this.dialog.open(NewFormDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(formName => {
      if (formName) {
        this.connectionsService.createForm(formName).subscribe(() => this.updateForms());
      }
    });
  }

}
