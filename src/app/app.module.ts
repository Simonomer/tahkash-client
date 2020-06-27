import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TagComponent} from './components/tag/tag.component';
import {ConnectionsService} from "./services/connections.service";
import {FormsManagementService} from "./services/forms.management.service";
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import {FormsManagementComponent} from './components/forms-management/forms-management.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEditorComponent,
    FormsManagementComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    ConnectionsService,
    FormsManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
