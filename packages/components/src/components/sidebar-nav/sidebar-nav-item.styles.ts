import { JssStyle } from 'jss';

export const styles: JssStyle = {
  item: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: ({ colors }) => colors.grey['300'],
  },
};
