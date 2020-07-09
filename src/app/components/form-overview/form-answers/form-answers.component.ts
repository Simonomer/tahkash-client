import {orderBy as _orderBy, meanBy as _meanBy} from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {IAnswer} from '../../../models/answer';
import {ConnectionsService} from '../../../services/connections.service';
import {QuestionWithAnswers} from '../../../models/question-with-answers';

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
      console.log(questionsWithAnswers)
      this.questionsWithAnswers = _orderBy(questionsWithAnswers, item => item.priority);
    });
  }

  averageRating(answers: IAnswer[]) {
    return _meanBy(answers, answer => answer.rating);
  }

}
