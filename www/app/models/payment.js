import EmberObject from '@ember/object';
import { computed } from '@ember/object';

var Payment = EmberObject.extend({
  formatAmount: computed('amount', function() {
    let value = parseInt(this.get('amount')) * 0.000000001;
    return value.toFixed(2);
  })
});

export default Payment;
