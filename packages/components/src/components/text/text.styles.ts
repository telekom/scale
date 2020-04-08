import { JssStyle } from 'jss';

export const styles: JssStyle = {
  text: {
    margin: 0,
    marginBottom: '.5rem',
    '*::slotted': {
      fontSize: 'unset',
    },
  },
};
