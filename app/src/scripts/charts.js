import { msToTime, months, getReindexedArray, days } from './utils';
import { runningAverage, getMeanOfThree, getAvgOfFive } from './solve-utils';

function pointFormatter() {
  return `<strong>${msToTime(this.y)}</strong>`;
}

export function createChart1(solves, useMeanOfThree = true) {
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
  };
}

export function createChart2(solves, frequency) {
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
        if(frequency === 'year') {
          let monthIndex = new Date().getMonth();
          return getReindexedArray(months, monthIndex);
        } else if(frequency === 'week') {
          let dayIndex = new Date().getDay();
          return getReindexedArray(days, dayIndex);
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
        if(frequency === 'year') {
          let counts = months.map(() => 0);
          solves.forEach((solve) => {
            let month = new Date(solve.getRecordedAt).getMonth();
            counts[month]++;
          });
          let monthIndex = new Date().getMonth();
          return getReindexedArray(counts, monthIndex);
        } else if(frequency === 'week') {
          let counts = days.map(() => 0);
          solves.forEach((solve) => {
            let month = new Date(solve.getRecordedAt).getDay();
            counts[month]++;
          });
          let dayIndex = new Date().getDay();
          return getReindexedArray(counts, dayIndex);
        }
      })()
    }]
  };
}
