import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormEditorComponent} from "./components/form-editor/form-editor.component";
import {EditorPageComponent} from './components/editor-page/editor-page.component';


const routes: Routes = [
  { path: 'forms', component: EditorPageComponent, children: [
    { path: ':formId', component: FormEditorComponent }] },
  { path: '**', redirectTo: '/forms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
