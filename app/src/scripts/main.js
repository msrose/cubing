import $ from './jquery';
import { createChart } from './charts';

$(document).ready(() => {
  let $puzzleDropdown = $('#puzzleDropdown');
  let $dateDropdown = $('#dateDropdown');

  let drawChart = () => {
    let puzzle = $puzzleDropdown.val();
    let since = $dateDropdown.val();
    createChart(puzzle, since);
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
