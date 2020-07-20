import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorPageComponent} from './pages/editor-page/editor-page.component';
import {AnswerPageComponent} from './pages/answer-page/answer-page.component';
import {FormEditorComponent} from './pages/editor-page/forms-editor/form-overview/form-editor/form-editor.component';
import {FormOverviewComponent} from './pages/editor-page/forms-editor/form-overview/form-overview.component';
import {FormAnswersComponent} from './pages/editor-page/forms-editor/form-overview/form-answers/form-answers.component';
import {FormsEditorComponent} from './pages/editor-page/forms-editor/forms-editor.component';


const routes: Routes = [
  {
    path: 'editor',
    component: EditorPageComponent,
    children: [
      {
        path: 'forms',
        component: FormsEditorComponent,
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
          }
        ]
      }
    ]
  },
  {
    path: 'answer/:formId',
    component: AnswerPageComponent
  },
  {
    path: '**',
    redirectTo: '/editor'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
