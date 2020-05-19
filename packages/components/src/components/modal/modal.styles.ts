import { JssStyle } from 'jss';

export const styles: JssStyle = {
  modal: {
    zIndex: 100,
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    height: 'calc(100% - 160px)',
    width: 'calc(100% - 62.5%)',
    margin: '80px 31.25%',
    alignItems: 'center',
  },
  'modal--opened': {
    display: 'flex',
  },
  'modal__scroll-container': {
    overflow: 'auto',
  },
  modal__content: {
    background: '#FFFFFF',
    color: '#333',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    maxHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  modal__header: {
    fontSize: '1.25rem',
    color: '#262626',
    margin: '0 1rem',
    padding: '1rem 0',
    lineHeight: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    '& ::slotted(*)': {
      fontSize: '1rem',
      color: '#262626',
      margin: 0,
      fontWeight: 'bold',
    },
  },
  'modal__header-scroll': {
    borderBottom: '1px solid #CCC',
  },
  modal__body: {
    padding: '1rem',
    lineHeight: '1',
  },
  modal__close: {
    cursor: 'pointer',
  },
  modal__actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
    background: '#FFF',
    borderRadius: '0 0 3px 3px',
  },

  modal__backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.75)',
  },
};
