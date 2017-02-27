define(['./jquery', './solve', './charts'], function (_jquery, _solve, _charts) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  var _solve2 = _interopRequireDefault(_solve);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  (0, _jquery2.default)(document).ready(() => {
    let $puzzleDropdown = (0, _jquery2.default)('#puzzleDropdown');
    let $dateDropdown = (0, _jquery2.default)('#dateDropdown');

    let drawChart = () => {
      let puzzle = $puzzleDropdown.val();
      let since = $dateDropdown.val();
      let url = `http://107.20.22.194/solves/${puzzle}`;
      // let url = `http://localhost:3000/solves/${puzzle}`;
      let dayMap = { week: 7, month: 30, year: 365 };
      if (dayMap[since]) {
        let timestamp = Date.now() - 1000 * 60 * 60 * 24 * dayMap[since];
        url = `${url}?since=${timestamp}`;
      }
      let $chart1 = (0, _jquery2.default)('#chart1');
      let $chart2 = (0, _jquery2.default)('#chart2');
      _jquery2.default.get(url, data => {
        let solves = data.solves.map((solveData, index) => {
          return new _solve2.default(solveData.recorded_at, solveData.duration, index + 1);
        });
        $chart1.highcharts((0, _charts.createChart1)(solves, puzzle === '6x6x6' || puzzle === '7x7x7'));
        $chart2.highcharts((0, _charts.createChart2)(solves, since));
      }).fail(() => {
        $chart1.text('There was an error loading the solves! Please try again.');
      });
      if (localStorage) {
        localStorage.chosenPuzzle = puzzle;
        localStorage.chosenDate = since;
      }
    };

    $puzzleDropdown.on('change', drawChart);
    $dateDropdown.on('change', drawChart);

    if (localStorage) {
      let puzzle = localStorage.chosenPuzzle || '3x3x3';
      let since = localStorage.chosenDate || 'month';
      $dateDropdown.val(since);
      $puzzleDropdown.val(puzzle).change();
    }
  });
});