define(['exports', './utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class Solve {
    constructor(recordedAt, duration, index) {
      this.recordedAt = recordedAt;
      this.duration = duration;
      this.index = index;
    }

    get getRecordedAt() {
      let date = new Date(this.recordedAt);
      return `${(0, _utils.getMonth)(date.getMonth())} ${date.getDate()}/${date.getFullYear().toString().substring(2)}`;
    }

    get getDuration() {
      return this.duration;
    }

    get getIndex() {
      return this.index;
    }
  }
  exports.default = Solve;
});