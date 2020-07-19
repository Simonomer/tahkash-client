import {orderBy as _orderBy} from 'lodash';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectionsService} from '../../services/connections.service';
import {IQuestion} from '../../models/question';
import {IAnswer} from '../../models/answer';

@Component({
  selector: 'answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {

  formId: string;
  questionsAndAnswers: { question: IQuestion, answer: IAnswer }[];

  constructor(private activatedRoute: ActivatedRoute,
              private connectionsService: ConnectionsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramsMap => {
      this.formId = paramsMap.get('formId');

      const questions = await this.connectionsService.getFormQuestions(this.formId);
      this.questionsAndAnswers = questions.map(question => (
        {
          question,
          answer: {questionId: question._id} as IAnswer
        }));
      this.matchAnswersToLocalhost();
      this.questionsAndAnswers = _orderBy(this.questionsAndAnswers,
        (questionAndAnswer: { question: IQuestion, answer: IAnswer }) => questionAndAnswer.question.priority);
    });
  }

  async submitForm(): Promise<void> {
    const answers = this.questionsAndAnswers.map(questionAndAnswer => questionAndAnswer.answer);
    await this.connectionsService.postAnswers(answers);
    // TODO: redirect to thank you page and delete localstorage
  }

  matchAnswersToLocalhost(): void {
    // TODO: look in local storage for existing answers with the form id and match the data
  }

}