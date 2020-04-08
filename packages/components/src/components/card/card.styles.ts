import { JssStyle } from 'jss';
export const styles: JssStyle = {
  card: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    color: '#333',
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12)',
    transition: 'all .2s ease-in-out',
  },
  card__body: {
    padding: '1rem',
    '& ::slotted(*)': {
      margin: 0,
    },
  },
  'card--interactive': {
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'block',
    '&:hover': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    '&:focus': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    '&:active': {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.24)',
    },
    '& $card__body ::slotted(*)': {
      margin: 0,
    },
  },
  'card--disabled': {
    '&, &:hover, &:focus, &:active': {
      opacity: 0.5,
      cursor: 'not-allowed',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12)',
      outline: 'none',
    },
  },
};
