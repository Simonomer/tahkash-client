import {orderBy as _orderBy} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConnectionsService} from '../../../../../services/connections.service';
import {IQuestion} from '../../../../../models/question';
import {QuestionsManagementService} from '../../../../../services/contexts.service/management.services/questions.management.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  editable = false;
  formId: string;
  questions$: Observable<IQuestion[]>;
  @ViewChild('inputValue') inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router,
    private questionsManagementService: QuestionsManagementService) {
  }

  ngOnInit(): void {
    this.questions$ = this.questionsManagementService.questions$;
    this.route.parent.paramMap.subscribe(async paramsMap => {
      this.formId = paramsMap.get('formId');
      await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
    });
  }


  async onDeleteClick(questionId: string): Promise<void> {
    await this.connectionsService.removeQuestion(questionId);
    await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
  }

  async onQuestionAdd(questionText: string) {
    await this.connectionsService.addQuestionForForm(this.formId, questionText);
    await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
    this.inputElem.nativeElement.value = '';
  }

  async onQuestionChange($event: IQuestion[]) {
    await this.connectionsService.modifyQuestions($event);
    await this.questionsManagementService.updateFormQuestionsFromServer(this.formId);
  }

  goToPreview(): void {
    this.router.navigate(['answer', this.formId]);
  }

}
