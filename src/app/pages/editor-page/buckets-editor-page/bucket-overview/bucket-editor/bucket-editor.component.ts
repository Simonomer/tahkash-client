import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IQuestion} from '../../../../../models/question';
import {ConnectionsService} from '../../../../../services/connections.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {QuestionsManagementService} from '../../../../../services/contexts.service/management.services/questions.management.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatCalendar} from '@angular/material/datepicker';

@Component({
  selector: 'app-bucket-editor',
  templateUrl: './bucket-editor.component.html',
  styleUrls: ['./bucket-editor.component.scss']
})
export class BucketEditorComponent implements OnInit {

  editable = true;
  bucketId: string;
  questions$: Observable<IQuestion[]>;
  @ViewChild('inputValue') inputElem: ElementRef;
  selectedDate: Date = new Date();
  date = new FormControl(new Date());

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
    console.log(this.selectedDate)
    await this.connectionsService.addQuestionForBucket(this.bucketId, text, this.date.value);
    await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
    this.inputElem.nativeElement.value = '';
  }

  async questionsChanged($event: IQuestion[]) {
    await this.connectionsService.modifyQuestions($event);
    await this.questionsManagementService.updateBucketQuestionsFromServer(this.bucketId);
  }
}
