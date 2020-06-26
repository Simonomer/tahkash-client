import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormEditorComponent} from "./components/form-editor/form-editor.component";


const routes: Routes = [
  { path: 'form/:formId', component: FormEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
