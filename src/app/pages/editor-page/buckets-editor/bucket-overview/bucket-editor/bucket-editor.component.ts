import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IQuestion} from '../../../../../models/question';
import {ConnectionsService} from '../../../../../services/connections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {orderBy as _orderBy} from 'lodash';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss']
})
export class BucketEditorComponent implements OnInit {

  bucketId: string;
  questions: IQuestion[];
  @ViewChild('inputValue') inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(paramsMap => {
      this.bucketId = paramsMap.get('bucketId');
      this.updateQuestions();
    });
  }

  async updateQuestions(): Promise<void> {
    const questions = await this.connectionsService.getBucketQuestions(this.bucketId);
    this.questions = _orderBy(questions, question => question.priority);
  }

  async onDeleteClick(questionClicked: IQuestion): Promise<void> {
    await this.connectionsService.removeQuestion(questionClicked._id);
    await this.updateQuestions();
  }

  async createQuestion(text: string): Promise<void> {
    await this.connectionsService.addQuestion(this.bucketId, text);
    await this.updateQuestions();
    this.inputElem.nativeElement.value = '';
  }

  async drop(event: CdkDragDrop<string[]>): Promise<void> {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    await this.connectionsService.modifyQuestions(this.questions);
    await this.updateQuestions();
  }

}
