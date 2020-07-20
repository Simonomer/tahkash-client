import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionType, IActionHandler} from '../../../components/sidebar/interfaces';
import {Observable, Subscription} from 'rxjs';
import {IForm} from '../../../models/form';
import {FormsManagementService} from '../../../services/contexts.service/management.services/forms.management.service';
import {CourseContextManagementService} from '../../../services/contexts.service/management.services/course-context.management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ICourseContext} from '../../../models/course-context';

@Component({
  selector: 'forms-editor',
  templateUrl: './forms-editor.component.html',
  styleUrls: ['./forms-editor.component.scss']
})
export class FormsEditorComponent implements OnInit, OnDestroy {

  private readonly actionToFunction: Record<ActionType, (param: string) => void> =
    {
      'Create': (formName: string) => this.formsManagementService.createForm(formName),
      'Clicked': (_id: string) => this.router.navigate([_id], {relativeTo: this.activatedRoute}),
      'Delete': (_id: string) => this.formsManagementService.deleteForm(_id)
    };

  forms$: Observable<IForm[]>;
  courseContextSubscription: Subscription;

  constructor(private formsManagementService: FormsManagementService,
              private courseContextManagementService: CourseContextManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.courseContextSubscription = this.courseContextManagementService.courseContext$.subscribe((context: ICourseContext) =>
      this.formsManagementService.updateFormsFromServer(context));
    await this.formsManagementService.updateFormsFromServer();
    this.forms$ = this.formsManagementService.forms$;
  }

  onAction(action: IActionHandler): void {
    this.actionToFunction[action.action](action.param);
  }

  ngOnDestroy(): void {
    this.courseContextSubscription.unsubscribe();
  }
}
