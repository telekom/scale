import { JssStyle } from 'jss';

export const styles: JssStyle = {
  collapsible: {
    margin: 0,
  },
  heading: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: ({ colors }) => colors.grey['300'],
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--nav-item-padding)', // TODO theme
    textAlign: 'left',
    color: 'var(--nav-color)', // TODO theme
    border: '2px solid transparent',
    borderRadius: ({ shape }) => shape.borderRadius,
    '&:hover': {
      color: 'var(--nav-color-hover)', // TODO theme
    },
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--nav-color-focus)', // TODO theme
    },
    '&[aria-expanded="true"] svg': {
      transform: 'rotate(180deg)',
    },
  },
};
