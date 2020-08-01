import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IQuestion} from '../../models/question';
import {IsraeliWeekDays} from '../interfaces';
import {groupBy as _groupBy, mapKeys as _mapKeys, sortBy as _sortBy } from 'lodash';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'questions-days-editor',
  templateUrl: './questions-days-editor.component.html',
  styleUrls: ['./questions-days-editor.component.scss']
})
export class QuestionsDaysEditorComponent {

  @Input() editable: boolean;

  WEEK_DAYS: IsraeliWeekDays[] = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  questionsPerWeekDays: Record<string, IQuestion[]>;

  _questions: IQuestion[];
  get questions(): IQuestion[] { return this._questions; }
  @Input() set questions(value: IQuestion[]) {
    this._questions = value;
    this.updateQuestionsPerWeekdays();
  };

  @Output() onDeleteClick = new EventEmitter<string>();
  @Output() onQuestionsChange = new EventEmitter<IQuestion[]>();

  updateQuestionsPerWeekdays() {
    const questionsWithWeekDay = this._questions?.map(question => ({...question, weekDay: new Date(question.eventDate)?.getDay()}));
    this.questionsPerWeekDays = _groupBy<IQuestion>(questionsWithWeekDay, 'weekDay')
    this.questionsPerWeekDays = _mapKeys(this.questionsPerWeekDays, (value, key) => this.WEEK_DAYS[key])
  }

  async drop(event: CdkDragDrop<IQuestion[]>): Promise<void> {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.onQuestionsChange.emit(event.container.data);
  }

  byDaysOrder = (a: KeyValue<string, IQuestion[]>, b: KeyValue<string, IQuestion[]>): number =>
    this.WEEK_DAYS.indexOf(a.key as IsraeliWeekDays) < this.WEEK_DAYS.indexOf(b.key as IsraeliWeekDays) ? -1 :
      (this.WEEK_DAYS.indexOf(b.key as IsraeliWeekDays) < this.WEEK_DAYS.indexOf(a.key as IsraeliWeekDays) ? 1 : 0);

}
