import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IQuestion} from '../../../../../models/question';
import {ConnectionsService} from '../../../../../services/connections.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {QuestionsManagementService} from '../../../../../services/contexts.service/management.services/questions.management.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss']
})
export class BucketEditorComponent implements OnInit {

  bucketId: string;
  questions$: Observable<IQuestion[]>;
  @ViewChild('inputValue') inputElem: ElementRef;

  constructor(
    private connectionsService: ConnectionsService,
    private route: ActivatedRoute,
    private questionsManagementService: QuestionsManagementService) {
  }

  ngOnInit(): void {
    this.questions$ = this.questionsManagementService.questions$;
    this.route.parent.paramMap.subscribe(async paramsMap => {
      this.bucketId = paramsMap.get('bucketId');
      await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
    });
  }

  async onDeleteClick(questionId: string): Promise<void> {
    await this.connectionsService.removeQuestion(questionId);
    await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
  }

  async createQuestion(text: string): Promise<void> {
    await this.connectionsService.addQuestionForBucket(this.bucketId, text);
    await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
    this.inputElem.nativeElement.value = '';
  }

  async drop(event: CdkDragDrop<string[]>): Promise<void> {
    moveItemInArray(this.questionsManagementService.questions, event.previousIndex, event.currentIndex);
    await this.connectionsService.modifyQuestions(this.questionsManagementService.questions);
    await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
  }

}
