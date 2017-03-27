import Ember from 'ember';

export default Ember.Component.extend({
  shape: 'Line',
  options: {},
  countdown: null,

  timePercentage: Ember.computed.alias('countdown.timePercentage'),
});
