import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import {ConnectionsService} from "./services/connections.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { FormsManagementComponent } from './components/forms-management/forms-management.component';
import { TagComponent } from './components/tag/tag.component';

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
    ConnectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
