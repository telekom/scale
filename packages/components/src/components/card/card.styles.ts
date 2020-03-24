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
  },
  card__body: {
    padding: '1rem',
  },
  'card--interactive': {
    '&, &:hover': {
      cursor: 'pointer',
    },
  },
};
