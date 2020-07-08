import {orderBy as _orderBy} from 'lodash';
import {ActivatedRoute} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConnectionsService} from "../../services/connections.service";
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {IQuestion} from "../../models/question";


@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  formId: string;
  questions: IQuestion[];
  @ViewChild("inputValue") inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.updateQuestions();
    });
  }

  updateQuestions() {
    this.connectionsService.getFormQuestions(this.formId).subscribe(questions => {
        this.questions = _orderBy(questions, question => question.priority);
      });
  }

  onDeleteClick(questionClicked: IQuestion) {
    this.connectionsService.removeQuestion(questionClicked._id).subscribe(() => this.updateQuestions());
  }

  createQuestion(text: string) {
    this.connectionsService.addQuestion(this.formId, text).subscribe(() => this.updateQuestions())
    this.inputElem.nativeElement.value = "";
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.connectionsService.modifyQuestions(this.questions).subscribe(() => this.updateQuestions());
  }

}
