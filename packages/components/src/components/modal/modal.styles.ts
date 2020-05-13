import { JssStyle } from 'jss';

export const styles: JssStyle = {
  modal: {},
  modal__content: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'fixed',
    background: 'white',
    color: '#333',
    padding: '1rem',
    textAlign: 'left',
    top: '10vh',
    left: '25%',
    width: '50%',
    maxWidth: '550px',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.5s ease-out',
  },
  modal__backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.75)',
    zIndex: 10,
    opacity: 0,
    pointerEvents: 'none',
  },
  modal__header: {
    fontSize: '0.8rem',
    color: '#333',
    margin: 0,
    borderBottom: '1px solid #333',
    padding: '0.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    '& ::slotted(*)': {
      margin: 0,
      fontSize: '1rem',
      color: '#262626',
      fontWeight: 'bold',
    },
  },
  modal__body: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  modal__close: {
    fontSize: '1rem',
    height: '16px',
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover': {
      opacity: 1,
    },
  },
  modal__actions: {
    borderTop: '1px solid #ccc',
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'flex-end',
    '& t-button': {
      margin: '0.25rem',
    },
  },
  'modal--opened': {
    '& $modal__backdrop, & $modal__content': {
      opacity: 1,
      pointerEvents: 'all',
    },
    '& $modal__content': {
      top: '15vh',
    },
  },
  'modal--hidden': {
    display: 'none',
  },
};
