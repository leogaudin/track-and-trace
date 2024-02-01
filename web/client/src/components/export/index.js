import { saveAs } from 'file-saver';
import { json2csv } from 'json-2-csv';

export function downloadJson(data, filename) {
	const blob = new Blob([ JSON.stringify(data) ], { type: 'application/json' });
	saveAs(blob, filename + '.json');
}

export function downloadCSV(data, filename) {
	const csv = json2csv(data, {});
	const blob = new Blob([ csv ], { type: 'text/csv' });
	saveAs(blob, filename + '.csv');
}
