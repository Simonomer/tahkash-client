import { Component, OnInit } from '@angular/core';
import {QuestionWithAnswers} from '../../models/question-with-answers';

@Component({
  selector: 'form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit {

  formId: string;
  questionsWithAnswers: QuestionWithAnswers[];

  constructor() { }

  ngOnInit(): void {
  }

}
