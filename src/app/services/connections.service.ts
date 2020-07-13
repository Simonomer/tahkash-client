import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestion} from '../models/question';
import {Observable} from 'rxjs';
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

  createForm(formName: string): Observable<IForm> {
    return this.http.post<IForm>(`${environment.serviceUrl}/form`, {name: formName});
  }

  getAllForms(): Observable<IForm[]> {
    return this.http.get<IForm[]>(`${environment.serviceUrl}/forms/true`);
  }

  getForm(formId: string): Observable<IForm> {
    return this.http.get<IForm>(`${environment.serviceUrl}/form/${formId}`);
  }

  modifyForm(form: IForm): Observable<IForm> {
    return this.http.put<IForm>(`${environment.serviceUrl}/form`, {...form, buckets: form.buckets.map(bucket => bucket._id)});
  }

  duplicateForm(formId: string): Observable<IForm> {
    return this.http.post<IForm>(`${environment.serviceUrl}/form/duplicate`, {_id: formId});
  }

  deleteForm(formId: string): Observable<IForm> {
    return this.http.delete<IForm>(`${environment.serviceUrl}/form/${formId}`);
  }

  // Questions
  addQuestion(formId: string, text: string): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.serviceUrl}/form/question/${formId}`, {text});
  }

  getFormQuestions(formId: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.serviceUrl}/form/question/${formId}`);
  }

  removeQuestion(questionId: string): Promise<IQuestion> {
    return this.http.delete<IQuestion>(`${environment.serviceUrl}/question/${questionId}`).toPromise();
  }

  modifyQuestions(questions: IQuestion[]): Observable<IQuestion[]> {
    questions.map((question, index) => question.priority = index);
    return this.http.put<IQuestion[]>(`${environment.serviceUrl}/question`, questions);
  }

  // buckets
  deleteBucket(bucketId: string): Observable<any> {
    return this.http.delete(`${environment.serviceUrl}/bucket/${bucketId}`);
  }

  addBucket(bucket: IBucket): Observable<IBucket> {
    return this.http.post<IBucket>(`${environment.serviceUrl}/bucket`, bucket);
  }

  getBuckets(): Observable<IBucket[]> {
    return this.http.get<IBucket[]>(`${environment.serviceUrl}/buckets`);
  }

  // Answers
  postAnswers(answers: IAnswer[]): Observable<IAnswer[]> {
    return this.http.post<IAnswer[]>(`${environment.serviceUrl}/answers`, answers);
  }

  getAnswersForFormId(formId: string): Observable<QuestionWithAnswers[]> {
    return this.http.get<QuestionWithAnswers[]>(`${environment.serviceUrl}/answers/${formId}`);
  }
}
