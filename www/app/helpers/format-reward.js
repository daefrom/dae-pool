import Ember from 'ember';

export function formatReward(params) {
    let value = params[0];
    let value2 = params[1];
    let reward = value * value2 * 0.000000001;
   // console.log(params[0] + " * " +params[1] + " = " +reward);

    return "₿" + reward.toFixed(8);
}

export default Ember.Helper.helper(formatReward);

