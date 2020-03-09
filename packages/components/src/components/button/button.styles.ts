import { JssStyle } from 'jss';

export const styles: JssStyle = {
  button: {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    verticalAlign: 'middle',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    color: '#000',
    background: '#fff',
    border: '1px solid #000',
    borderRadius: 0,
    padding: '0.25rem 1rem',
    boxShadow: 'none',
    lineHeight: '2rem',
    fontFamily: 'unset',
    fontSize: 'unset',
    fontWeight: 400,
    textTransform: 'initial',
    letterSpacing: 0,
    transition: 'all 0.2s ease-in-out',
    '&:before': {
      width: 0,
      content: '"',
      display: 'block',
      height: '100%',
    },
    '&:hover, &.active': {
      color: '#fff',
      background: '#000',
      borderColor: '#000',
      boxShadow: 'none',
      transition: 'all 0.2s ease-in-out',
      textDecoration: 'none',
    },
    '&:not(.tabbing):focus': {
      outline: 0,
    },
  },
  'button--disabled': {
    '&, &:hover': {
      background: '#fff',
      border: '1px solid #000',
      color: '#000',
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
};
