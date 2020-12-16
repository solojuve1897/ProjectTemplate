import moment from 'moment';

export const formatDateTime = (value) => {
  if (value) {
    const date = moment.utc(value);
    return date.format('YYYY-MMM-DD HH:mm');
  }
};
