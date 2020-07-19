import {Component, OnInit} from '@angular/core';
import {IForm} from '../../models/form';
import {Observable} from 'rxjs';
import {FormsManagementService} from '../../services/forms.management.service';
import {ActionType, IActionHandler} from '../../components/sidebar/interfaces';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {

  private readonly actionToFunction: Record<ActionType, (param: string) => void> =
    {
      'Create': (formName: string) => this.formsManagementService.createForm(formName),
      'Clicked': (_id: string) => this.router.navigate([_id], {relativeTo: this.activatedRoute}),
      'Delete': (_id: string) => this.formsManagementService.deleteForm(_id)
    };

  forms$: Observable<IForm[]>;

  constructor(private formsManagementService: FormsManagementService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    await this.formsManagementService.updateFormsFromServer();
    this.forms$ = this.formsManagementService.forms$;
  }

  onAction(action: IActionHandler) {
    this.actionToFunction[action.action].apply(action.param);
  }

}

