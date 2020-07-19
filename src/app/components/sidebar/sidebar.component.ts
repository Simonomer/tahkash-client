import {Component, OnInit} from '@angular/core';
import {NewFormDialogComponent} from './new-form-dialog/new-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConnectionsService} from '../../services/connections.service';
import {IForm} from '../../models/form';
import {FormsManagementService} from '../../services/forms.management.service';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  filteredForms: IForm[];

  constructor(public dialog: MatDialog,
              private connectionsService: ConnectionsService,
              private formsManagementService: FormsManagementService,
              private filterService: FilterService) {
  }

  async ngOnInit(): Promise<void> {
    this.filterService.filteredFormsChanged.subscribe(filteredForms => this.filteredForms = filteredForms);
  }

  openNewFormDialog(): void {
    const dialogRef = this.dialog.open(NewFormDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(async formName => {
      if (formName) {
        await this.formsManagementService.createForm(formName);
      }
    });
  }
}
