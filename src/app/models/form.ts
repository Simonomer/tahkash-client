import {IBucket} from './bucket';
import {IHasIdAndName} from './has-name-id';
import {ICourseContext} from './course-context';

export interface IForm extends IHasIdAndName, ICourseContext {
  _id: string;
  link: string;
  creationTime: Date;
  buckets: IBucket[];
}
