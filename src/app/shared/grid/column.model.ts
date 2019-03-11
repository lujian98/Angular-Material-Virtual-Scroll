export interface SunColumn {
  field: string;
  header?: string;
  index?: number;
  width?: number;
  align?: string;
  hidden?: boolean;
  sortable?: boolean;
  filter?: boolean | string;
  groupable?: boolean;
  editable?: boolean;
  readonly?: boolean;
  format?: string;
  render?: Function;
}
