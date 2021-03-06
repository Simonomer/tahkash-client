import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IQuestion} from "../models/question";
import {Observable} from "rxjs";
import {IForm} from "../models/form";

@Injectable()
export class ConnectionsService {
  constructor(private http: HttpClient) {
  }

  getFormQuestions(formId: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.serviceUrl}/form/question/${formId}`);
  }

  addQuestion(formId: string, text: string): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.serviceUrl}/form/question/${formId}`, {text});
  }

  removeQuestion(questionId: string) {
    return this.http.delete(`${environment.serviceUrl}/question/${questionId}`);
  }

  modifyQuestions(questions: IQuestion[]): Observable<IQuestion[]> {
    questions.map((question, index) => question.priority = index);
    return this.http.put<IQuestion[]>(`${environment.serviceUrl}/question`, questions);
  }

  createForm(formName: string): Observable<IForm> {
    return this.http.post<IForm>(`${environment.serviceUrl}/form`, { name: formName });
  }

  getAllForms(): Observable<IForm[]> {
    return this.http.get<IForm[]>(`${environment.serviceUrl}/form`);
  }

  modifyForm(form: IForm) {
    return this.http.put(`${environment.serviceUrl}/form`, form);
  }
}
