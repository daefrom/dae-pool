import { helper as buildHelper } from '@ember/component/helper';

export function formatBalance(value) {
  if (value < 0) {
    value = 0;
  }
  value = value * 0.000000001 ;
  return value.toFixed(1);
}

export default buildHelper(formatBalance);
