import { JssStyle } from 'jss';

export const styles: JssStyle = {
  'list-item': {},
  'list-item--type': {
    listStyle: ({ type }) => type || 'square',
  },
  'list-item--has-icon': {
    listStyle: 'none !important',
    display: 'flex',
    alignItems: 'center',
  },
};
