import $ from './jquery';
import Solve from './solve';
import { createChart1, createChart2 } from './charts';

$(document).ready(() => {
  let $puzzleDropdown = $('#puzzleDropdown');
  let $dateDropdown = $('#dateDropdown');

  let drawChart = () => {
    let puzzle = $puzzleDropdown.val();
    let since = $dateDropdown.val();
    let url = `http://107.20.22.194/solves/${puzzle}`;
    // let url = `http://localhost:3000/solves/${puzzle}`;
    let dayMap = { week: 7, month: 30, year: 365 };
    if(dayMap[since]) {
      let timestamp = Date.now() - 1000 * 60 * 60 * 24 * dayMap[since];
      url = `${url}?since=${timestamp}`;
    }
    let $chart1 = $('#chart1');
    let $chart2 = $('#chart2');
    $.get(url, (data) => {
      let solves = data.solves.map((solveData, index) => {
        return new Solve(solveData.recorded_at, solveData.duration, index + 1);
      });
      $chart1.highcharts(createChart1(solves, puzzle === '6x6x6' || puzzle === '7x7x7'));
      $chart2.highcharts(createChart2(solves, since));
    }).fail(() => {
      $chart1.text('There was an error loading the solves! Please try again.');
    });
    if(localStorage) {
      localStorage.chosenPuzzle = puzzle;
      localStorage.chosenDate = since;
    }
  };

  $puzzleDropdown.on('change', drawChart);
  $dateDropdown.on('change', drawChart);

  if(localStorage) {
    let puzzle = localStorage.chosenPuzzle || '3x3x3';
    let since = localStorage.chosenDate || 'month';
    $dateDropdown.val(since);
    $puzzleDropdown.val(puzzle).change();
  }
});
