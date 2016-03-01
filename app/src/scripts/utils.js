(() => {
  function pad(val, size) {
    val = val.toString();
    while(val.length < size) {
      val = '0' + val;
    }
    return val;
  }

  function msToTime(ms) {
    let mins = Math.floor(ms / 60000);
    ms %= 60000;
    let secs = Math.floor(ms / 1000);
    ms %= 1000;
    return mins + ':' + pad(secs, 2) + '.' + Math.round(ms);
  }

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  function getMonth(index) {
    return months[index];
  }

  window.SolveUtils = {
    pad,
    msToTime,
    getMonth
  };
})();
