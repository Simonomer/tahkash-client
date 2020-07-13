import {IBucket} from './bucket';

export interface IForm {
  _id: string;
  name: string;
  link: string;
  creationTime: Date;
  buckets: IBucket[];
}
