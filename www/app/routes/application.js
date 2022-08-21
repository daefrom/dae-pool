import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import $ from 'jquery';
import config from '../config/environment';

function selectLocale(selected) {
  // FIXME
  let supported = ['en', 'cs-cz', 'en-us'];
  const language = navigator.languages[0] || navigator.language || navigator.userLanguage;

  let locale = selected;

  if (locale == null) {
    // default locale
    locale = language;
    if (supported.indexOf(locale) < 0) {
      locale = locale.replace(/\-[a-zA-Z]*$/, '');
    }
  }
  if (supported.indexOf(locale) >= 0) {
    if (locale === 'en') {
      locale = 'en-us';
    }
  } else {
    locale = 'cs-cz';
  }
  return locale;
}


export default Route.extend({
  intl: inject(),

  selectedLanguage: null,
  languages: null,
  beforeModel() {
    let locale = this.get('selectedLanguage');
    if (!locale) {
      // read cookie
      locale = Ember.$.cookie('lang');
      // pick a locale
      locale = selectLocale(locale);

      this.get('intl').setLocale(locale);
      Ember.$.cookie('lang', locale);
      this.set('selectedLanguage', locale);
    }
    let intl = this.get('intl');
    this.set('languages', [
      { name: intl.t('lang.english'), value: 'en-us'},
      { name: intl.t('lang.czech'), value: 'cs-cz'}

    ]);
  },

  actions: {
    selectLanguage: function(lang) {
      let selected = lang;
      if (typeof selected === 'undefined') {
        return true;
      }
      let locale = selectLocale(selected);
      this.get('intl').setLocale(locale);
      this.set('selectedLanguage', locale);
      Ember.$.cookie('lang', locale);
      let languages = this.get('languages');
      for (var i = 0; i < languages.length; i++) {
        if (languages[i].value == locale) {
          Ember.$('#selectedLanguage').html(languages[i].name + '<b class="caret"></b>');
          break;
        }
      }


      return true;
    }
  },

  model: function() {
    let url = config.APP.ApiUrl + 'api/stats';
    return $.getJSON(url).then(function(data) {
      return EmberObject.create(data);
    });
	},

  setupController: function(controller, model) {
    this._super(controller, model);
    later(this, this.refresh, 5000);
    model.languages = this.get('languages');
  }
});
