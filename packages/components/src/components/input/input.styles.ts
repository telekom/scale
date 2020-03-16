import { JssStyle } from 'jss';

export const styles: JssStyle = {
  input: {
    display: 'flex',
    width: '100%',
    border: '1px solid #dfdfdf',
    borderRadius: '4px',
    padding: '0.5rem',
    fontSize: '16px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    '&:not(.tabbing):focus': {
      outline: 0,
    },
  },
};
