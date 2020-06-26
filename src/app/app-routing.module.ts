import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormEditorComponent} from "./components/form-editor/form-editor.component";
import {FormsManagementComponent} from "./components/forms-management/forms-management.component";


const routes: Routes = [
  { path: 'forms', component: FormsManagementComponent },
  { path: 'forms/:formId', component: FormEditorComponent },
  { path: '**', redirectTo: '/forms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
