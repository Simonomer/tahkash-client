export interface IActionHandler {
  params: { };
  action: ActionType;
}

export type ActionType = 'Delete' | 'Clicked' | 'Create';

