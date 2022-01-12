export type columnNames = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type columnSizes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

export interface Sizes {
  columnName: columnNames;
  size: string;
}
export type sizableProps =
  | 'columns'
  | 'spacing'
  | 'gutter-x'
  | 'gutter-y'
  | 'size'
  | 'offset';

export interface SizedProp {
  propName: sizableProps;
  sizes: Sizes[];
}
