import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorPageComponent} from './pages/editor-page/editor-page.component';
import {FormOverviewComponent} from './pages/editor-page/form-overview/form-overview.component';
import {FormEditorComponent} from './pages/editor-page/form-overview/form-editor/form-editor.component';
import {FormAnswersComponent} from './pages/editor-page/form-overview/form-answers/form-answers.component';
import {AnswerPageComponent} from './pages/answer-page/answer-page.component';


const routes: Routes = [
  {
    path: 'forms',
    component: EditorPageComponent,
    children: [
      {
        path: ':formId',
        component: FormOverviewComponent,
        children: [
          {
            path: '',
            redirectTo: 'edit',
            pathMatch: 'prefix'
          },
          {
            path: 'edit',
            component: FormEditorComponent
          },
          {
            path: 'answers',
            component: FormAnswersComponent
          }
        ]
      }]
  },
  {
    path: 'answer/:formId',
    component: AnswerPageComponent
  },
  {
    path: '**',
    redirectTo: '/forms'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
