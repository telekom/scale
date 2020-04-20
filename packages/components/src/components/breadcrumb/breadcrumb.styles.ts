import { JssStyle } from 'jss';

export const styles: JssStyle = {
  breadcrumb: {
    '& ol': {
      listStyle: 'none',
      paddingLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      display: 'flex',
    },
    '& li': {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: '1ch',
    },
  },
  separator: {
    display: 'inline-block',
    marginLeft: '1ch',
  },
  link: {
    // TODO
    color: 'currentColor',
    '&:hover': {},
  },
  current: {
    fontWeight: ({ typography }) => typography.fontWeightBold,
  },
};
