import Controller from '@ember/controller';
import { computed } from '@ember/object';
import config from '../config/environment';
import { inject } from '@ember/service';
import $ from 'jquery';


export default Controller.extend({
  
    get config() {
        return config.APP;
    },


    roundVariance: Ember.computed('model', {
        get() {
            console.log(this.get('model.currentRoundShares'))
            console.log(this.get('difficulty'))
            console.log(this.get('config').ShareDifficulty)
            var percent = (this.get('model.currentRoundShares') * this.get('config').ShareDifficulty) / this.get('difficulty');
            if (!percent) {
                return 0;
            }
            return percent.toFixed(2);
        }
    })
});
