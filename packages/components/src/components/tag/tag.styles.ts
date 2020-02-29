import { JssStyle } from 'jss';

export const styles: JssStyle = {
  tag: {
    display: 'inline-flex',
    color: '#fff',
    background: '#333',
    border: '1px solid #dfdfdf',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    fontSize: '0.8rem',
  },
  'tag--pill': {
    borderRadius: '1rem',
    padding: '0.6rem',
  },
  'tag--link': {
    textDecoration: 'none',
    '&:hover': {
      background: '#1d2124',
    },
    '&:active': {
      background: '#1d2124',
    },
    '&:focus': {
      outline: 0,
      boxShadow: '0 0 0 0.2rem rgba(52, 58, 64, 0.5)',
    },
  },
  'tag--variant-primary': {
    color: '#fff',
    background: '#007bff',
    borderColor: '#007bff',
  },
};
