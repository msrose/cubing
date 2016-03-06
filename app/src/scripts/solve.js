import { getMonth } from './utils';

export default class Solve {
  constructor(recordedAt, duration, index) {
    this.recordedAt = recordedAt;
    this.duration = duration;
    this.index = index;
  }

  get getRecordedAt() {
    let date = new Date(this.recordedAt);
    return `${getMonth(date.getMonth())} ${date.getDate()}/${date.getFullYear().toString().substring(2)}`;
  }

  get getDuration() {
    return this.duration;
  }

  get getIndex() {
    return this.index;
  }
}
