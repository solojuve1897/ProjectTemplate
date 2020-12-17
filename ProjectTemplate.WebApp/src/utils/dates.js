import moment from 'moment';

export const formatDateTime = (value) => {
  if (value) {
    const date = moment(value);
    return date.format('YYYY-MMM-DD');
  }
};
