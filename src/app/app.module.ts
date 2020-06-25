import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormCreatorComponent } from './components/form-creator/form-creator.component';
import {ConnectionsService} from "./services/connections.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FormCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConnectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
