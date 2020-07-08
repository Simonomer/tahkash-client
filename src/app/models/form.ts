import {ITag} from "./tag";

export interface IForm {
  _id: string,
  name: string,
  link: string,
  creationTime: Date,
  tags: ITag[]
}
