import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorPageComponent} from './pages/editor-page/editor-page.component';
import {AnswerPageComponent} from './pages/answer-page/answer-page.component';
import {FormsEditorComponent} from './pages/editor-page/forms-editor/forms-editor.component';
import {FormOverviewComponent} from './pages/editor-page/forms-editor/form-overview/form-overview.component';
import {FormEditorComponent} from './pages/editor-page/forms-editor/form-overview/form-editor/form-editor.component';
import {FormAnswersComponent} from './pages/editor-page/forms-editor/form-overview/form-answers/form-answers.component';
import {BucketsEditorComponent} from './pages/editor-page/buckets-editor/buckets-editor.component';
import {BucketOverviewComponent} from './pages/editor-page/buckets-editor/bucket-overview/bucket-overview.component';


const routes: Routes = [
  {
    path: 'editor',
    component: EditorPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'buckets',
        pathMatch: 'full'
      },
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
      },
      {
        path: 'buckets',
        component: BucketsEditorComponent,
        children: [
          {
            path: ':bucketId',
            component: BucketOverviewComponent,
            children: [
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
