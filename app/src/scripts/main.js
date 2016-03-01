(($, Solve, SolveUtils) => {
  const puzzles = ['7x7x7', '3x3x3'];

  puzzles.forEach((puzzle) => {
    let url = `http://ec2-54-165-242-22.compute-1.amazonaws.com/solves/${puzzle}`;
    $.get(url, (data) => {
      let solves = data.solves.map((solveData, index) => {
        return new Solve(solveData.recorded_at, solveData.duration, index);
      });

      function pointFormatter() {
        return `<strong>${SolveUtils.msToTime(this.y)}</strong>`;
      }

      $(`#${puzzle}`).highcharts({
        title: {
          text: puzzle,
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
            formatter: function() {
              return SolveUtils.msToTime(this.value);
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
          data: Array.from((function*() {
            let sum = 0;
            for(let i = 0; i < solves.length; i++) {
              sum += solves[i].getDuration;
              yield sum / (i + 1);
            }
          })()),
          tooltip: { pointFormatter }
        }, {
          name: 'Mean of 3',
          type: 'scatter',
          color: 'lightgreen',
          data: solves.map((solve, index) => {
            return ((solves[index - 2] || solve).getDuration +
              (solves[index - 1] || solve).getDuration +
              solve.getDuration) / 3;
          }),
          tooltip: { pointFormatter }
        }]
      });
    });
  });
})(jQuery, window.Solve, window.SolveUtils);
