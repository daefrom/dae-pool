import Ember from 'ember';

export function formatEtcUsd(params) {
    let value = params[0];

    return "$" + value.toFixed(4);
}

export default Ember.Helper.helper(formatEtcUsd);

