(($) => {

  $.get('/logs/7x7x7/latest.csv', (data) => {
    let solves = parseLogData(data);

    function pointFormatter() {
      return `<strong>${msToTime(this.y)}</strong>`;
    }

    $('#7x7x7').highcharts({
      title: {
        text: '7x7x7',
        style: {
          fontWeight: 'bold'
        }
      },
      xAxis: {
        title: {
          text: 'Total Solves',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        },
        categories: solves.map((solve) => `${solve.getIndex}<br>${solve.getDay}`),
        tickInterval: 10,
        endOnTick: true
      },
      yAxis: {
        title: {
          text: 'Solve Time',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        },
        labels: {
          formatter: function() {
            return msToTime(this.value);
          }
        }
      },
      series: [{
        name: 'Individual Solve',
        type: 'scatter',
        color: 'blue',
        data: solves.map((solve) => solve.getMsTime),
        tooltip: { pointFormatter }
      }, {
        name: 'Overall Average',
        type: 'line',
        color: 'red',
        data: Array.from((function*() {
          let sum = 0;
          for(let i = 0; i < solves.length; i++) {
            sum += solves[i].getMsTime;
            yield sum / (i + 1);
          }
        })()),
        tooltip: { pointFormatter }
      }, {
        name: 'Mean of 3',
        type: 'scatter',
        color: 'lightgreen',
        data: solves.map((solve, index) => {
          return ((solves[index - 2] || solve).getMsTime +
            (solves[index - 1] || solve).getMsTime +
            solve.getMsTime) / 3;
        }),
        tooltip: { pointFormatter }
      }]
    });
  });

  class Solve {
    constructor(date, rawTime, index) {
      this.date = date;
      this.time = rawTime;
      this.index = index;
    }

    get getDate() {
      return this.date;
    }

    get getDay() {
      return this.date.split(' ').slice(0, 3).join(' ');
    }

    get getTime() {
      return this.time;
    }

    get getIndex() {
      return this.index;
    }

    get getMsTime() {
      let time = this.time;
      let colonIndex = time.indexOf(':');
      let dotIndex = time.indexOf('.');
      let mins = parseInt(time.substring(0, colonIndex), 10);
      let secs = parseInt(time.substring(colonIndex + 1, dotIndex), 10);
      let subSecs = parseInt(time.substring(dotIndex + 1), 10);
      return mins * 60 * 1000 + secs * 1000 + subSecs * 10;
    }
  }

  function parseLogData(csv) {
    let lines = csv.split('\n');
    lines.shift();
    lines.pop();
    return lines.reverse().map((line, index) => {
      let items = line.split(',');
      let date = items[0];
      let time = items[1];
      return new Solve(date, time, index);
    });
  }

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

})(jQuery);
