export function* runningAverage(solves) {
  let sum = 0;
  for(let i = 0; i < solves.length; i++) {
    sum += solves[i].getDuration;
    yield sum / (i + 1);
  }
}

export function getMeanOfThree(solves) {
  return solves.map((solve, i) => {
    return avg([
      (solves[i - 2] || solve).getDuration,
      (solves[i - 1] || solve).getDuration,
      solve.getDuration
    ]);
  });
}

export function getAvgOfFive(solves) {
  return solves.map((solve, i) => {
    let subset = solves.slice(Math.max(0, i - 4), i + 1).map(s => s.getDuration);
    if(subset.length >= 3) {
      let minVal = Math.min.apply(null, subset);
      let maxVal = Math.max.apply(null, subset);
      subset.splice(subset.indexOf(minVal), 1);
      subset.splice(subset.indexOf(maxVal), 1);
    }
    return avg(subset);
  });
}

export function avg(items) {
  return items.reduce((a, b) => a + b) / items.length;
}
