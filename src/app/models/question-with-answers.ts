import {IQuestion} from './question';
import {IAnswer} from './answer';

export interface QuestionWithAnswers extends IQuestion {
  answers: IAnswer[];
}
