const moment = require('moment');

export const formatDateForTable = (date) => moment(date).format('DD-MM-YYYY HH:mm');