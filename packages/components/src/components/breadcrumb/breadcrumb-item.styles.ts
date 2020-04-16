import { JssStyle } from 'jss';

export const styles: JssStyle = {
  breadcrumb__item: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '1ch',
    '& a[aria-current="page"]': {
      fontWeight: ({ typography }) => typography.fontWeightBold,
    },
  },
  'breadcrumb__item-icon': {
    marginLeft: '1ch',
  },
};
