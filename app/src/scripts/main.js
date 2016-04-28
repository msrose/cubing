import $ from './jquery';
import { createChart } from './charts';

$(document).ready(() => {
  let $puzzleDropdown = $('#puzzleDropdown');

  $puzzleDropdown.on('change', () => {
    let puzzle = $puzzleDropdown.val();
    createChart(puzzle);
    localStorage && (localStorage.chosenPuzzle = puzzle);
  });

  if(localStorage) {
    let puzzle = localStorage.chosenPuzzle || '3x3x3';
    $puzzleDropdown.val(puzzle).change();
  }
});
