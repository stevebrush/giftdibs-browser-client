export interface DropdownMenuItem {
  action: Function;
  label: string;
  icon?: string;
  addSeparatorAfter?: boolean;
  custom?: any;
}
