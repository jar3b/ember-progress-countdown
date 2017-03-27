import Ember from 'ember';

const {get, set, computed, run} = Ember;

export default Ember.Service.extend({
  init() {
    set(this, 'totalTime', 10000);
    set(this, 'tickInterval', 100);
    set(this, 'timer', null);

    set(this, 'onFinished', null);

    this.reset();
  },

  remainingTime: computed('elapsedTime', function () {
    const remainingTime = get(this, 'totalTime') - get(this, 'elapsedTime');
    return (remainingTime > 0) ? remainingTime : 0;
  }),

  timePercentage: computed('elapsedTime', 'totalTime', function () {
    const totalTime = get(this, 'totalTime');
    if (totalTime == 0)
      return 0;

    return get(this, 'elapsedTime') / get(this, 'totalTime');
  }),

  hasFinished: computed('remainingTime', function () {
    return get(this, 'remainingTime') === 0;
  }),

  reset() {
    set(this, 'elapsedTime', 0);
    set(this, 'currentTime', Date.now());
  },

  start() {
    this.stop();
    set(this, 'currentTime', Date.now());
    this.tick();
  },

  stop() {
    const timer = get(this, 'timer');

    if (timer) {
      run.cancel(timer);
      set(this, 'timer', null);
    }
  },

  tick() {
    if (get(this, 'hasFinished')) {
      const onFinishedCallback = get(this, 'onFinished');
      if (onFinishedCallback != null) {
        onFinishedCallback();
      }
      return;
    }

    const tickInterval = get(this, 'tickInterval');
    const currentTime = get(this, 'currentTime');
    const elapsedTime = get(this, 'elapsedTime');
    const now = Date.now();

    set(this, 'elapsedTime', elapsedTime + (now - currentTime));
    set(this, 'currentTime', now);
    set(this, 'timer', run.later(this, this.tick, tickInterval));
  }
});
