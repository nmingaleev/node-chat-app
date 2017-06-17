var moment = require('moment');
var someTimestamp = moment().valueOf();

var date = moment();
//date.add(1, 'year').subtract(9, 'months');
console.log(date.format('LT'));
