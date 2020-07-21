import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorPageComponent} from './pages/editor-page/editor-page.component';
import {AnswerPageComponent} from './pages/answer-page/answer-page.component';
import {BucketsEditorPageComponent} from './pages/editor-page/buckets-editor-page/buckets-editor-page.component';
import {BucketEditorComponent} from './pages/editor-page/buckets-editor-page/bucket-overview/bucket-editor/bucket-editor.component';
import {FormsEditorPageComponent} from './pages/editor-page/forms-editor-page/forms-editor-page.component';
import {FormEditorComponent} from './pages/editor-page/forms-editor-page/form-overview/form-editor/form-editor.component';
import {FormOverviewComponent} from './pages/editor-page/forms-editor-page/form-overview/form-overview.component';
import {FormAnswersComponent} from './pages/editor-page/forms-editor-page/form-overview/form-answers/form-answers.component';
import {BucketOverviewComponent} from './pages/editor-page/buckets-editor-page/bucket-overview/bucket-overview.component';


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
        component: FormsEditorPageComponent,
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
        component: BucketsEditorPageComponent,
        children: [
          {
            path: ':bucketId',
            component: BucketOverviewComponent,
            children: [
              {
                path: '',
                redirectTo: 'edit',
                pathMatch: 'prefix'
              },
              {
                path: 'edit',
                component: BucketEditorComponent
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
