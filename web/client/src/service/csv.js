import Papa from 'papaparse';
import { addBoxes } from './index';
const pako = require('pako');

function isCSVValid(file) {
	return file.type === 'text/csv';
}

function parseCSV(text, setUploadProgress, setResults, setIsLoading, setComplete) {
	let boxes = [];
	const user = JSON.parse(localStorage.getItem('user'));
	Papa.parse(text, {
		worker: true,
		step: (element) => {
			const [id, project, division, district, zone, school, htName, htPhone, institutionType] = element.data;
			boxes.push({
				id,
				project,
				division,
				district,
				zone,
				school,
				htName,
				htPhone,
				institutionType,
				adminId: user.id
			});
		},
		complete: () => {
			uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete);
		}
	})
}

function uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete) {
	const payload = pako.gzip(JSON.stringify(boxes));
	addBoxes(payload)
		.then((res) => {
			setResults(res => createSummary(res));
			setIsLoading(false);
			setComplete(true);
		})
		.catch((err) => {
			console.log(err);
		}
	);
}

function createSummary(results) {
	const invalid = results.flatMap((res) => res['invalidInstances'] || []);
	const valid = results.flatMap((res) => res['validInstances'] || []);
	return { invalid, valid };
}

export async function handleCSV(files, setUploadProgress, setResults, setIsLoading, setComplete) {
	const file = files[0];
	if (!isCSVValid(file)) {
		throw Error('File is not CSV');
	}
	try {
		const data = await file.text();
		parseCSV(data, setUploadProgress, setResults, setIsLoading, setComplete);
	} catch (error) {
		console.log(error);
	}
}
