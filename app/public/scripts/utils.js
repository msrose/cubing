define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pad = pad;
  exports.msToTime = msToTime;
  exports.getMonth = getMonth;
  exports.getReindexedArray = getReindexedArray;
  function pad(val, size) {
    val = val.toString();
    while (val.length < size) {
      val = '0' + val;
    }
    return val;
  }

  function msToTime(ms) {
    let mins = Math.floor(ms / 60000);
    ms %= 60000;
    let secs = Math.floor(ms / 1000);
    ms %= 1000;
    return `${mins}:${pad(secs, 2)}.${pad(Math.round(ms), 3)}`;
  }

  const months = exports.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const days = exports.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getMonth(index) {
    return months[index];
  }

  function getReindexedArray(array, index) {
    index = index + 1;
    let firstPart = array.slice(0, index);
    let lastPart = array.slice(index, array.length);
    return lastPart.concat(firstPart);
  }
});