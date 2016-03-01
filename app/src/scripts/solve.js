((SolveUtils) => {
  class Solve {
    constructor(recordedAt, duration, index) {
      this.recordedAt = recordedAt;
      this.duration = duration;
      this.index = index;
    }

    get getRecordedAt() {
      let date = new Date(this.recordedAt);
      return `${SolveUtils.getMonth(date.getMonth())} ${date.getDate()}/${date.getFullYear().toString().substring(2)}`;
    }

    get getDuration() {
      return this.duration;
    }

    get getIndex() {
      return this.index;
    }
  }

  window.Solve = Solve;
})(window.SolveUtils);
