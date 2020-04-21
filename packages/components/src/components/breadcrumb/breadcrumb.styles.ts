import { JssStyle } from 'jss';

export const styles: JssStyle = {
  breadcrumb: {
    marginLeft: '-0.4em', // TODO use theme
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
      marginRight: '0.125ch',
    },
  },
  separator: {
    display: 'inline-block',
    marginLeft: '0.125ch',
  },
  item: {
    padding: '0.4em', // TODO use theme
  },
  link: {
    textDecoration: 'none',
    padding: '0.4em', // TODO use theme
    borderRadius: 8, // TODO use theme
    border: '2px solid transparent', // TODO use theme (border-width)
    color: ({ colors }) => colors.text.default,
    '&:hover': {
      color: '#F90984', // TODO use theme
    },
    '&:active': {
      color: '#CB0068', // TODO use theme
    },
    '&:focus': {
      borderColor: '#009DE0', // TODO use theme
      outline: 'none',
    },
  },
  current: {
    fontWeight: ({ typography }) => typography.fontWeightBold,
  },
};
