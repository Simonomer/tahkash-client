import {orderBy as _orderBy} from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConnectionsService} from '../../../../services/connections.service';
import {IQuestion} from '../../../../models/question';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  formId: string;
  questions: IQuestion[];
  @ViewChild('inputValue') inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.updateQuestions();
    });
  }

  async updateQuestions(): Promise<void> {
    const questions = await this.connectionsService.getFormQuestions(this.formId);
    this.questions = _orderBy(questions, question => question.priority);
  }

  async onDeleteClick(questionClicked: IQuestion): Promise<void> {
    await this.connectionsService.removeQuestion(questionClicked._id);
    await this.updateQuestions();
  }

  async createQuestion(text: string): Promise<void> {
    await this.connectionsService.addQuestion(this.formId, text);
    await this.updateQuestions();
    this.inputElem.nativeElement.value = '';
  }

  async drop(event: CdkDragDrop<string[]>): Promise<void> {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    await this.connectionsService.modifyQuestions(this.questions);
    await this.updateQuestions();
  }

  goToPreview(): void {
    this.router.navigate(['answer', this.formId]);
  }
}
