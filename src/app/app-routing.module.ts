import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorPageComponent} from './components/editor-page/editor-page.component';
import {FormOverviewComponent} from './components/form-overview/form-overview.component';
import {FormEditorComponent} from './components/form-overview/form-editor/form-editor.component';
import {FormAnswersComponent} from './components/form-overview/form-answers/form-answers.component';
import {AnswerPageComponent} from './components/answer-page/answer-page.component';


const routes: Routes = [
  { path: 'forms', component: EditorPageComponent, children: [
    { path: ':formId', component: FormOverviewComponent, children: [
        { path: 'edit', component: FormEditorComponent },
        { path: 'answers', component: FormAnswersComponent },
        { path: '', redirectTo: 'edit', pathMatch: 'prefix' }
      ] }] },
  { path: 'answer/:formId', component: AnswerPageComponent },
  { path: '**', redirectTo: '/forms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
