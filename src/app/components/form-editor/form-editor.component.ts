import {orderBy as _orderBy} from 'lodash';
import {IQuestion} from "../../models/question";
import {ConnectionsService} from "../../services/connections.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'form-creator',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  questions: IQuestion[];
  formId: string;
  @ViewChild("inputValue") inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.updateQuestions();
    })
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
