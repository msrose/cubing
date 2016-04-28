import $ from './jquery';
import Solve from './solve';
import { msToTime } from './utils';
import { runningAverage, getMeanOfThree, getAvgOfFive } from './solve-utils';

function pointFormatter() {
  return `<strong>${msToTime(this.y)}</strong>`;
}

export function createChart(puzzle) {
  let useMeanOfThree = false;
  if(puzzle === '6x6x6' || puzzle === '7x7x7') {
    useMeanOfThree = true;
  }
  let url = `http://ec2-54-165-242-22.compute-1.amazonaws.com/solves/${puzzle}`;
  $.get(url, (data) => {
    let solves = data.solves.map((solveData, index) => {
      return new Solve(solveData.recorded_at, solveData.duration, index + 1);
    });

    $('#chart1').highcharts({
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
  });
}
