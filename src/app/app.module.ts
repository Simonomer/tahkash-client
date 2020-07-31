import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ConnectionsService} from './services/connections.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {EditorPageComponent} from './pages/editor-page/editor-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ItemsManagementTableComponent} from './components/sidebar/items-table/items-management-table.component';
import {NewItemDialogComponent} from './components/sidebar/new-item-dialog/new-item-dialog.component';
import {AnswerPageComponent} from './pages/answer-page/answer-page.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatRadioModule} from '@angular/material/radio';
import {SearchBarComponent} from './components/sidebar/search-bar/search-bar.component';
import {LocalstorageService} from './services/localstorage.service';
import {MatMenuModule} from '@angular/material/menu';
import {ChipsAutoCompleteComponent} from './components/chips-auto-complete/chips-auto-complete.component';
import {ContextsService} from './services/contexts.service';
import {TopbarComponent} from './components/topbar/topbar.component';
import {BucketsManagementService} from './services/contexts.service/management.services/buckets.management.service';
import {CourseContextManagementService} from './services/contexts.service/management.services/course-context.management.service';
import {FormsManagementService} from './services/contexts.service/management.services/forms.management.service';
import {CourseToWeeksManagementService} from './services/contexts.service/management.services/course-to-weeks.management.service';
import {QuestionsManagementService} from './services/contexts.service/management.services/questions.management.service';
import {BucketsEditorPageComponent} from './pages/editor-page/buckets-editor-page/buckets-editor-page.component';
import {BucketEditorComponent} from './pages/editor-page/buckets-editor-page/bucket-overview/bucket-editor/bucket-editor.component';
import {FormEditorComponent} from './pages/editor-page/forms-editor-page/form-overview/form-editor/form-editor.component';
import {FormsEditorPageComponent} from './pages/editor-page/forms-editor-page/forms-editor-page.component';
import {FormOverviewComponent} from './pages/editor-page/forms-editor-page/form-overview/form-overview.component';
import {FormAnswersComponent} from './pages/editor-page/forms-editor-page/form-overview/form-answers/form-answers.component';
import {BucketOverviewComponent} from './pages/editor-page/buckets-editor-page/bucket-overview/bucket-overview.component';
import {QuestionsDaysEditorComponent} from './components/questions-days-editor/questions-days-editor.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    FormEditorComponent,
    ItemsManagementTableComponent,
    ChipsAutoCompleteComponent,
    EditorPageComponent,
    FormAnswersComponent,
    FormOverviewComponent,
    SidebarComponent,
    NewItemDialogComponent,
    AnswerPageComponent,
    SearchBarComponent,
    BucketOverviewComponent,
    TopbarComponent,
    BucketsEditorPageComponent,
    FormsEditorPageComponent,
    BucketEditorComponent,
    QuestionsDaysEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ClipboardModule,
    MatRadioModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    ConnectionsService,
    FormsManagementService,
    LocalstorageService,
    BucketsManagementService,
    ContextsService,
    CourseContextManagementService,
    CourseToWeeksManagementService,
    QuestionsManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
