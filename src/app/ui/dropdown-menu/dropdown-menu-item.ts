export interface DropdownMenuItem {
  label: string;
  action?: Function;
  icon?: string;
  addSeparatorAfter?: boolean;
  data?: any;
  route?: string;
}
