import Ember from 'ember';

export default Ember.Component.extend({
  shape: 'Line',
  options: {},
  countdown: Ember.inject.service(),
  totalTime: 180,
  tickInterval: 500,

  timePercentage: Ember.computed.alias('countdown.timePercentage'),

  didInsertElement(...args) {
    this._super(...args);
    const self = this;

    this.set('countdown.totalTime', this.get('totalTime'));
    this.set('countdown.tickInterval', this.get('tickInterval'));
    this.set('countdown.onFinished', function () {
      self.sendAction('timerFinished');
    });

    this.get('countdown').start();
  }
});
