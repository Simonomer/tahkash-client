import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ConnectionsService} from "./services/connections.service";
import {FormsManagementService} from "./services/forms.management.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {EditorPageComponent} from './components/editor-page/editor-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {FormOverviewComponent} from './components/form-overview/form-overview.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FormEditorComponent} from './components/form-overview/form-editor/form-editor.component';
import {FormsManagementTableComponent} from './components/sidebar/forms-table/forms-management-table.component';
import {FormAnswersComponent} from './components/form-overview/form-answers/form-answers.component';
import {NewFormDialog} from './components/sidebar/new-form-dialog/new-form-dialog.component';
import {ChipsAutoCompleteComponent} from './components/form-overview/chips-auto-complete/chips-auto-complete.component';
import { AnswerPageComponent } from './components/answer-page/answer-page.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    FormEditorComponent,
    FormsManagementTableComponent,
    ChipsAutoCompleteComponent,
    EditorPageComponent,
    FormAnswersComponent,
    FormOverviewComponent,
    SidebarComponent,
    NewFormDialog,
    AnswerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ClipboardModule,
    MatRadioModule
  ],
  providers: [
    ConnectionsService,
    FormsManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
