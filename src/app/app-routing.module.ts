import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormEditorComponent} from "./components/form-editor/form-editor.component";
import {EditorPageComponent} from './components/editor-page/editor-page.component';
import {FormOverviewComponent} from './components/form-overview/form-overview.component';
import {FormAnswersComponent} from './components/form-answers/form-answers.component';


const routes: Routes = [
  { path: 'forms', component: EditorPageComponent, children: [
    { path: ':formId', component: FormOverviewComponent, children: [
        { path: 'edit', component: FormEditorComponent },
        { path: 'answers', component: FormAnswersComponent },
        { path: '', redirectTo: 'edit', pathMatch: 'prefix' }
      ] }] },
  { path: '**', redirectTo: '/forms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
