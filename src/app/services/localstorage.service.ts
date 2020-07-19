import {Injectable} from '@angular/core';

@Injectable()
export class LocalstorageService {

  public BUCKET_NAMES = 'bucketNames';
  public TIME_BACK_FORMS = 'timeBackForms';

  getByKey(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
