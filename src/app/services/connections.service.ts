import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestion} from '../models/question';
import {IForm} from '../models/form';
import {IBucket} from '../models/bucket';
import {IAnswer} from '../models/answer';
import {QuestionWithAnswers} from '../models/question-with-answers';

@Injectable()
export class ConnectionsService {
  constructor(private http: HttpClient) {
  }

  // Buckets
  searchBuckets(filters: object): Promise<IBucket[]> {
    return this.http.post<IBucket[]>(`${environment.serviceUrl}/buckets/_search`, filters).toPromise();
  }

  // Forms
  searchForms(filters: object): Promise<IForm[]> {
    return this.http.post<IForm[]>(`${environment.serviceUrl}/forms/_search`, filters).toPromise();
  }

  createForm(form: IForm): Promise<IForm> {
    return this.http.post<IForm>(`${environment.serviceUrl}/form`, {...form}).toPromise();
  }

  getAllForms(): Promise<IForm[]> {
    return this.http.get<IForm[]>(`${environment.serviceUrl}/forms/true`).toPromise();
  }

  getForm(formId: string): Promise<IForm> {
    return this.http.get<IForm>(`${environment.serviceUrl}/form/${formId}`).toPromise();
  }

  modifyForm(form: IForm): Promise<IForm> {
    return this.http.put<IForm>(`${environment.serviceUrl}/form`, {...form, bucketIds: form.buckets.map(bucket => bucket._id)}).toPromise();
  }

  duplicateForm(formId: string): Promise<IForm> {
    return this.http.post<IForm>(`${environment.serviceUrl}/form/duplicate`, {_id: formId}).toPromise();
  }

  deleteForm(formId: string): Promise<IForm> {
    return this.http.delete<IForm>(`${environment.serviceUrl}/form/${formId}`).toPromise();
  }

  // Questions
  addQuestionForBucket(bucketId: string, text: string, eventDate: Date): Promise<IQuestion> {
    return this.http.post<IQuestion>(`${environment.serviceUrl}/bucket/question/${bucketId}`, {text, eventDate}).toPromise();
  }

  addQuestionForForm(formId: string, text: string): Promise<IQuestion> {
    return this.http.post<IQuestion>(`${environment.serviceUrl}/form/question/${formId}`, {text}).toPromise();
  }

  getFormQuestions(formId: string): Promise<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.serviceUrl}/form/questions/${formId}`).toPromise();
  }

  getBucketQuestions(bucketId: string): Promise<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.serviceUrl}/bucket/questions/${bucketId}`).toPromise();
  }

  removeQuestion(questionId: string): Promise<IQuestion> {
    return this.http.delete<IQuestion>(`${environment.serviceUrl}/question/${questionId}`).toPromise();
  }

  modifyQuestions(questions: IQuestion[]): Promise<IQuestion[]> {
    questions.map((question, index) => question.priority = index);
    return this.http.put<IQuestion[]>(`${environment.serviceUrl}/question`, questions).toPromise();
  }

  // buckets$
  deleteBucket(bucketId: string): Promise<any> {
    return this.http.delete(`${environment.serviceUrl}/bucket/${bucketId}`).toPromise();
  }

  addBucket(bucket: IBucket): Promise<IBucket> {
    return this.http.post<IBucket>(`${environment.serviceUrl}/bucket`, {...bucket}).toPromise();
  }

  getBuckets(): Promise<IBucket[]> {
    return this.http.get<IBucket[]>(`${environment.serviceUrl}/buckets`).toPromise();
  }

  // Answers
  postAnswers(answers: IAnswer[]): Promise<IAnswer[]> {
    return this.http.post<IAnswer[]>(`${environment.serviceUrl}/answers`, answers).toPromise();
  }

  getAnswersForFormId(formId: string): Promise<QuestionWithAnswers[]> {
    return this.http.get<QuestionWithAnswers[]>(`${environment.serviceUrl}/answers/${formId}`).toPromise();
  }
}
