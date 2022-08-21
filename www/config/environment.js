'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'open-ethereum-pool',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // API host and port
      ApiUrl: '//solo.daepool.com/',

      // HTTP mining endpoint
      HttpHost: 'https://solo.daepool.com',
      HttpPort: 8880,

      // Stratum mining endpoint
      StratumHost: 'solo.daepool.com',
      StratumPort: 4114,
      NiceHashPort: 4224,

      // Fee and payout details
      PoolFee: '1.00%',
      PayoutThreshold: '20 DAE',

      // For network hashrate (change for your favourite fork)
      BlockTime: 12.2,
      ShareDifficulty: '4000000000',
      Unit: 'DAE',
      Currency: 'USD',
      //Twitter Parameter
      TwitterURL: 'https://twitter.com/',
      TwitterHash: 'daefromofficial',
      PaymentText: 'every 30 minutes',
      SupportMail: 'pool@daefrom.com',

      //Chart config
      highcharts: {
        main: {
          enabled: true,
          height: 300,
          type: 'areaspline',
          color: '#357ab3',
          title: '',
          ytitle: '',
          interval: 180000,
          chartInterval: 900000
        },
        account: {
          enabled: true,
          height: 300,
          type: 'spline',
          color: [ '', '' ],
          title: '',
          ytitle: '',
          interval: 180000,
          chartInterval: 900000,
          paymentInterval: 30000
        }
      }
    }
  };

  if (environment === 'development') {
    /* Override ApiUrl just for development, while you are customizing
      frontend markup and css theme on your workstation.
    */
    ENV.APP.ApiUrl = 'http://localhost:8081/'
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/ember-cli-twitter-feed/';
  }

  ENV.contentSecurityPolicy = {
    'script-src': [
      "'self'",
      'https://syndication.twitter.com',
      "'sha256-XnNQECY9o-nIv2Qgcd1A39YarwxTm10rhdzegH_JBxY='"],
    'style-src': [
      "'self'",
      'http://platform.twitter.com',
      "'sha256-zCvYlDs6LsUp0EqrJFjIGUiM_AG2fGlkNrzJ2YiBTG0='"],
    'img-src': [
      "'self'",
      'data:',
      'https://syndication.twitter.com',
      'http://platform.twitter.com']
  };
  return ENV;
};
