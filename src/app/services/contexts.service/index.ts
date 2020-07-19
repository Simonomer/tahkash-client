import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ContextTypes} from './emums';

@Injectable()
export class ContextsService {
  private contexts: Partial<Record<ContextTypes, BehaviorSubject<any>>> = {};

  public setCurrentContextValue(contextType: ContextTypes, contextValue: any): void {
    this.ensureHasType(contextType, contextValue);
    this.contexts[contextType].next(contextValue);
  }

  public getCurrentContextValue<T>(contextType: ContextTypes): T {
    this.ensureHasType(contextType);
    return this.contexts[contextType].getValue();
  }

  public watchSelectedContext<T>(contextType: ContextTypes): Observable<T> {
    this.ensureHasType(contextType);
    return this.contexts[contextType].asObservable();
  }

  public resetCurrentContext(contextType: ContextTypes): void {
    this.setCurrentContextValue(contextType, undefined);
  }

  private ensureHasType(contextType: ContextTypes, initialValue?): boolean {
    const isNotExists = this.contexts[contextType] == null;
    if (isNotExists) {
      this.contexts[contextType] = new BehaviorSubject(initialValue);
    }
    return !isNotExists;
  }
}
