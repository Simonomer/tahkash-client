import {IBucket} from './bucket';
import {IHasIdAndName} from './has-name';

export interface IForm extends IHasIdAndName {
  _id: string;
  link: string;
  creationTime: Date;
  buckets: IBucket[];
}
