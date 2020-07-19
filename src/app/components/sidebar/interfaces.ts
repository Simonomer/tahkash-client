export interface IActionHandler {
  param: string;
  action: ActionType;
}

export type ActionType = 'Delete' | 'Clicked' | 'Create';

