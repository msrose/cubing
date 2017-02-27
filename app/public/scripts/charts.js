define(['exports', './utils', './solve-utils'], function (exports, _utils, _solveUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createChart1 = createChart1;
  exports.createChart2 = createChart2;


  function pointFormatter() {
    return `<strong>${(0, _utils.msToTime)(this.y)}</strong>`;
  }

  function createChart1(solves, useMeanOfThree = true) {
    return {
      title: {
        text: 'Solve Times'
      },
      xAxis: {
        title: {
          text: 'Total Solves',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        },
        categories: solves.map(solve => `${solve.getIndex}<br>${solve.getRecordedAt}`),
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
          formatter() {
            return (0, _utils.msToTime)(this.value);
          }
        }
      },
      series: [{
        name: 'Individual Solve',
        type: 'scatter',
        color: 'blue',
        data: solves.map(solve => solve.getDuration),
        tooltip: { pointFormatter }
      }, {
        name: 'Overall Average',
        type: 'line',
        color: 'red',
        data: Array.from((0, _solveUtils.runningAverage)(solves)),
        tooltip: { pointFormatter }
      }, {
        name: useMeanOfThree ? 'Mean of 3' : 'Avg. of 5',
        type: 'scatter',
        color: 'lightgreen',
        data: useMeanOfThree ? (0, _solveUtils.getMeanOfThree)(solves) : (0, _solveUtils.getAvgOfFive)(solves),
        tooltip: { pointFormatter }
      }]
    };
  }

  function createChart2(solves, frequency) {
    return {
      title: {
        text: 'Solve Counts'
      },
      xAxis: {
        title: {
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        },
        categories: (() => {
          if (frequency === 'year') {
            let monthIndex = new Date().getMonth();
            return (0, _utils.getReindexedArray)(_utils.months, monthIndex);
          } else if (frequency === 'week') {
            let dayIndex = new Date().getDay();
            return (0, _utils.getReindexedArray)(_utils.days, dayIndex);
          }
        })()
      },
      yAxis: {
        title: {
          text: 'Number of Solves',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        }
      },
      series: [{
        name: 'Number of Solves',
        type: 'column',
        color: 'blue',
        data: (() => {
          if (frequency === 'year') {
            let counts = _utils.months.map(() => 0);
            solves.forEach(solve => {
              let month = new Date(solve.getRecordedAt).getMonth();
              counts[month]++;
            });
            let monthIndex = new Date().getMonth();
            return (0, _utils.getReindexedArray)(counts, monthIndex);
          } else if (frequency === 'week') {
            let counts = _utils.days.map(() => 0);
            solves.forEach(solve => {
              let month = new Date(solve.getRecordedAt).getDay();
              counts[month]++;
            });
            let dayIndex = new Date().getDay();
            return (0, _utils.getReindexedArray)(counts, dayIndex);
          }
        })()
      }]
    };
  }
});