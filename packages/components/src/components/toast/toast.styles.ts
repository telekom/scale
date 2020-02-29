import { JssStyle } from 'jss';

export const styles: JssStyle = {
  toast: {
    boxSizing: 'border-box',
    width: '400px',
    position: 'fixed',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    opacity: 0,
  },
  toast__body: {
    padding: '1rem',
  },
  toast__header: {
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    fontSize: '1.25rem',
    margin: 0,
    justifyContent: 'space-between',
    display: 'flex',
    '& a': {
      cursor: 'pointer',
    },
    '& small': {
      fontSize: '0.8rem',
      marginLeft: '120px',
      marginTop: '5px',
    },
  },
  toast__progress: {
    background: 'red',
    height: '2px',
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
};
