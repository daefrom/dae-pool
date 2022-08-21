import Route from '@ember/routing/route';
import { later } from '@ember/runloop';
import $ from 'jquery';
import Block from "../models/block";
import config from '../config/environment';

export default Route.extend({
  model: function() {
    let url = config.APP.ApiUrl + 'api/blocks';
    return $.getJSON(url).then(function(data) {
      if (data.candidates) {
        data.candidates = data.candidates.map(function(b) {
          return Block.create(b);
        });
      }
      if (data.immature) {
        data.immature = data.immature.map(function(b) {
          return Block.create(b);
        });
        // Sort blocks by timestamp
        data.immature = data.immature.sort((a, b) => {
          if (a.timestamp < b.timestamp) {
            return 1;
          }
          if (a.timestamp > b.timestamp) {
            return -1;
          }
          return 0;
        });
      }
      if (data.matured) {
        data.matured = data.matured.map(function(b) {
          return Block.create(b);
        });
        // Sort blocks by timestamp
        data.matured = data.matured.sort((a, b) => {
          if (a.timestamp < b.timestamp) {
            return 1;
          }
          if (a.timestamp > b.timestamp) {
            return -1;
          }
          return 0;
        });
      }
      return data;
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    later(this, this.refresh, 5000);
  }
});
