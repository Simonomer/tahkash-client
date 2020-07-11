import {Injectable} from '@angular/core';

@Injectable()
export class LocalstorageService {

  public TAG_NAMES = 'tagNames';

  getByKey(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
