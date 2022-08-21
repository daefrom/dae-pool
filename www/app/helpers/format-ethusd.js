import Ember from 'ember';

export function formatEthUsd(params) {
	let value = params[0];

       let valueeth = value * 1;

	return "₿ " + valueeth.toFixed(8);
}

export default Ember.Helper.helper(formatEthUsd);

