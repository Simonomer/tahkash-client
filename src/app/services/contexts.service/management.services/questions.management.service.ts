import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ContextTypes} from '../emums';
import {ContextsService} from '../index';
import {ConnectionsService} from '../../connections.service';
import {IQuestion} from '../../../models/question';
import {orderBy as _orderBy} from 'lodash';

@Injectable()
export class QuestionsManagementService {

  public questions$: Observable<IQuestion[]>;

  public set questions(value: IQuestion[]) {
    this.contextsService.setCurrentContextValue(ContextTypes.questions, value);
  }

  public get questions(): IQuestion[] {
    return this.contextsService.getCurrentContextValue(ContextTypes.questions);
  }

  constructor(private contextsService: ContextsService,
              private connectionsService: ConnectionsService) {
    this.questions$ = this.contextsService.watchSelectedContext(ContextTypes.questions);
  }

  async updateFormQuestionsFromServer(formId: string) {
    const questions = await this.connectionsService.getFormQuestions(formId);
    this.questions = _orderBy(questions, question => question.priority);
  }

  async updateBucketQuestionsFromServer(bucketId: string) {
    const questions = await this.connectionsService.getBucketQuestions(bucketId);
    this.questions = _orderBy(questions, question => question.priority);
  }
}
