import {orderBy as _orderBy} from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {QuestionWithAnswers} from '../../models/question-with-answers';
import {ConnectionsService} from '../../services/connections.service';

@Component({
  selector: 'form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent implements OnInit {

  displayedColumns: string[] = ['text', 'rating'];
  formId: string;
  questionsWithAnswers: QuestionWithAnswers[];

  constructor(private connectionsService: ConnectionsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramsMap => {
      this.formId = paramsMap.get('formId');
      this.updateQuestionsWithAnswers();
    });
  }

  updateQuestionsWithAnswers() {
    this.connectionsService.getAnswersForFormId(this.formId).subscribe(questionsWithAnswers => {
      this.questionsWithAnswers = _orderBy(questionsWithAnswers, item => item.priority);
    });
  }

}
