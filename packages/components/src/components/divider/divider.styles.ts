import { JssStyle } from 'jss';

export const styles: JssStyle = {
  ':host': {
    width: '100%',
    height: '100%',
  },
  divider: {
    '& hr': {
      border: '0',
      borderTop: '1px solid #dfdfdf',
    },
  },
  divider__vertical: {
    borderLeft: '1px solid #dfdfdf',
    minHeight: '1rem',
  },
  'divider--vertical': {
    '&, divider__vertical': {
      height: 'inherit',
      display: 'inline-flex',
    },
  },
};
