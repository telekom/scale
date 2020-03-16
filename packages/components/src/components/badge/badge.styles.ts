import { JssStyle } from 'jss';

export const styles: JssStyle = {
  badge: {
    display: 'inline-block',
    padding: '0.25em 0.4em',
    fontSize: '90%',
    fontWeight: 700,
    lineHeight: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '0.25rem',
    transition: 'all 0.15s ease-in-out',
    background: '#343a40',
    color: ' #fff',
  },
  'badge--pill': {
    paddingRight: '0.6em',
    paddingLeft: '0.6em',
    borderRadius: '10rem',
  },
  'badge--variant-dark': {
    color: '#fff',
    backgroundColor: '#343a40',
  },
  'badge--variant-light': {
    color: '#212529',
    backgroundColor: '#f8f9fa',
  },
  'badge--variant-info': {
    color: '#fff',
    backgroundColor: '#17a2b8',
  },
  'badge--variant-warning': {
    color: '#212529',
    backgroundColor: '#ffc107',
  },
  'badge--variant-danger': {
    color: '#fff',
    backgroundColor: '#dc3545',
  },
  'badge--variant-success': {
    color: '#fff',
    backgroundColor: '#28a745',
  },
  'badge--variant-secondary': {
    color: '#fff',
    backgroundColor: '#6c757d',
  },
  'badge--variant-primary': {
    color: '#fff',
    backgroundColor: '#007bff',
  },
  'badge--link': {
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
};
