'use strict';

// Random Number based on a supplied Max number, return will be a num 0 - max
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function commaFormatted(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}