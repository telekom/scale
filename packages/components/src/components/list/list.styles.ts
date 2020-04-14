import { JssStyle } from 'jss';

export const styles: JssStyle = {
  list: {},
  'list--variant-unordered': {
    '&.list-style-type': {
      'list-style-type': ({ listStyleType }) => listStyleType || 'square',
    },
  },
};
