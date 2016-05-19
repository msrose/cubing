import $ from './jquery';
import Solve from './solve';
import { msToTime } from './utils';
import { runningAverage, getMeanOfThree, getAvgOfFive } from './solve-utils';

function pointFormatter() {
  return `<strong>${msToTime(this.y)}</strong>`;
}

export function createChart(puzzle, since) {
  let useMeanOfThree = false;
  if(puzzle === '6x6x6' || puzzle === '7x7x7') {
    useMeanOfThree = true;
  }
  let url = `http://ec2-54-165-242-22.compute-1.amazonaws.com/solves/${puzzle}`;
  // let url = `http://localhost:3000/solves/${puzzle}`;
  let dayMap = { week: 7, month: 30, year: 365 };
  if(dayMap[since]) {
    let timestamp = Date.now() - 1000 * 60 * 60 * 24 * dayMap[since];
    url = `${url}?since=${timestamp}`;
  }

  let $chart1 = $('#chart1');
  $.get(url, (data) => {
    let solves = data.solves.map((solveData, index) => {
      return new Solve(solveData.recorded_at, solveData.duration, index + 1);
    });

    $chart1.highcharts({
      title: false,
      xAxis: {
        title: {
          text: 'Total Solves',
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          }
        },
        categories: solves.map((solve) => `${solve.getIndex}<br>${solve.getRecordedAt}`),
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
            return msToTime(this.value);
          }
        }
      },
      series: [{
        name: 'Individual Solve',
        type: 'scatter',
        color: 'blue',
        data: solves.map((solve) => solve.getDuration),
        tooltip: { pointFormatter }
      }, {
        name: 'Overall Average',
        type: 'line',
        color: 'red',
        data: Array.from(runningAverage(solves)),
        tooltip: { pointFormatter }
      }, {
        name: useMeanOfThree ? 'Mean of 3' : 'Avg. of 5',
        type: 'scatter',
        color: 'lightgreen',
        data: useMeanOfThree ? getMeanOfThree(solves) : getAvgOfFive(solves),
        tooltip: { pointFormatter }
      }]
    });
  }).fail(() => {
    $chart1.text('There was an error loading the solves! Please try again.');
  });
}
