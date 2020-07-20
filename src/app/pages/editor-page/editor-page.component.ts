import {Component, OnDestroy, OnInit} from '@angular/core';
import {IForm} from '../../models/form';
import {Observable, Subscription} from 'rxjs';
import {ActionType, IActionHandler} from '../../components/sidebar/interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import {ICourseContext} from '../../models/course-context';
import {FormsManagementService} from '../../services/contexts.service/management.services/forms.management.service';
import {CourseContextManagementService} from '../../services/contexts.service/management.services/course-context.management.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent {}

