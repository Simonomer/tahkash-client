import {FormControl} from '@angular/forms';
import {orderBy as _orderBy} from 'lodash';
import {ActivatedRoute} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConnectionsService} from "../../services/connections.service";
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {ITag} from "../../models/tag";
import {IForm} from "../../models/form";
import {IQuestion} from "../../models/question";
import {Subject} from "rxjs";


@Component({
  selector: 'form-creator',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  formId: string;
  currentForm: IForm;
  completeTags: ITag[];
  questions: IQuestion[];

  tagRemoved: Subject<string>;
  tagAdded: Subject<string>;
  @ViewChild("inputValue") inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagAdded = new Subject<string>();
    this.tagRemoved = new Subject<string>();

    this.route.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.connectionsService.getTags().subscribe(tags => this.completeTags = tags);
      this.connectionsService.getForm(this.formId).subscribe(form => this.currentForm = form);
      this.updateQuestions();
    });

    this.tagAdded.subscribe(tagId => {
      if (!this.currentForm.tags.find(tag => tag._id === tagId)) {
        this.currentForm.tags.push(this.completeTags.find(tag => tag._id === tagId));
        this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
      }
    })

    this.tagRemoved.subscribe(tagId => {
      this.currentForm.tags = this.currentForm.tags.filter(tag => tag._id !== tagId);
      this.connectionsService.modifyForm(this.currentForm).subscribe(form => this.currentForm = form);
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
