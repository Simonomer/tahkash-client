export interface IQuestion {
  _id: string;
  bucketId?: string;
  formId?: string;
  text: string;
  priority: number;
  eventDate: Date;
}
