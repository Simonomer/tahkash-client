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
  templateUrl: './forms-editor-page.component.html',
  styleUrls: ['./forms-editor-page.component.scss']
})
export class FormsEditorPageComponent implements OnInit, OnDestroy {

  private readonly actionToFunction: Record<ActionType, (params: { }) => void> =
    {
      'Create': (form: { name: string, courseContext: ICourseContext }) => this.formsManagementService.createForm(form.name, form.courseContext),
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
    this.courseContextSubscription = this.courseContextManagementService.courseContext$.subscribe(() =>
      this.formsManagementService.updateFormsFromServer());
    await this.formsManagementService.updateFormsFromServer();
    this.forms$ = this.formsManagementService.forms$;
  }

  onAction(action: IActionHandler): void {
    this.actionToFunction[action.action](action.params);
  }

  ngOnDestroy(): void {
    this.courseContextSubscription.unsubscribe();
  }
}
