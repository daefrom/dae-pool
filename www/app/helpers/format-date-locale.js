import { helper as buildHelper } from '@ember/component/helper';

export function formatDateLocale(ts) {
	let date = new Date(ts * 1000);
    return date.toLocaleString("sk-sk");
}

export default buildHelper(formatDateLocale);
