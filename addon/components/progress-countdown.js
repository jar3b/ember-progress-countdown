import Ember from 'ember';

export default Ember.Component.extend({
  shape: 'Line',
  options: {},
  countdown: Ember.inject.service(),
  totalTime: 180,
  tickInterval: 500,
  started: false,

  startedChanged: Ember.observer('started', function () {
    const started = this.get('started');

    if (started) {
      this.get('countdown').start();
    }
    else {
      this.get('countdown').stop();
    }
  }),

  totalTimeChanged: Ember.observer('totalTime', function () {
    this.set('countdown.totalTime', this.get('totalTime'));
  }),

  timePercentage: Ember.computed.alias('countdown.timePercentage'),

  didInsertElement(...args) {
    this._super(...args);
    const self = this;

    this.set('countdown.totalTime', this.get('totalTime'));
    this.set('countdown.tickInterval', this.get('tickInterval'));
    this.set('countdown.onFinished', function () {
      self.send('timerFinished');
    });
  },

  actions: {
    timerFinished(){
      this.sendAction('timerFinished');
    }
  }
});
