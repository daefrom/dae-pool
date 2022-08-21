import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  stat: Ember.computed.reads('applicationController'),
  config: Ember.computed.reads('applicationController.config'),
  netstats: Ember.computed.reads('applicationController'),
  stats: Ember.computed.reads('applicationController.model.stats'),


  netHashrate: Ember.computed({
    get() {
      return this.get('hashrate');
    }
  }),
  earnPerDay: Ember.computed('model', {
    get() {
      return 24 * 60 * 60 / this.get('config').BlockTime * this.get('config').BlockReward *
          this.getWithDefault('model.hashrate') / this.get('hashrate');
    }
  })


});
