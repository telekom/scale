import { JssStyle } from 'jss';

export const styles: JssStyle = {
  collapsible: {
    width: '100%',
    appearance: 'none',
    // padding: 0,
    color: 'inherit',
    background: 'transparent',
    font: 'inherit',
    fontWeight: 'inherit',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    borderBottom: '1px solid transparent',

    padding: '1.6em 1em 1.6em 2em',
    /* '&[aria-expanded="true"] svg': {
      transform: 'rotate(180deg)',
    } */
  },
  'collapsible--bold': {
    fontWeight: ({ typography }) => typography.fontWeightBold,
  },
  'collapsible--border': {
    borderBottomColor: ({ colors }) => colors.grey['200'],
  },
};
