import Papa from 'papaparse';
import { addBoxes } from './index';

function isCSVValid(file) {
	return file.type === 'text/csv';
}

function parseCSV(text, setUploadProgress, setResults, setIsLoading, setComplete) {
	let boxes = [];
	const user = JSON.parse(localStorage.getItem('user'));
	Papa.parse(text, {
		worker: true,
		step: (element) => {
			const [id, division, district, zone, school, htName, htPhone, institutionType] = element.data;
			boxes.push({
				id,
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
	const BOXES_LENGTH = boxes.length - 1;
	const BUFFER_SIZE = 7;
	let uploaded = 0;
	for (let i = 1; i < boxes.length; i += BUFFER_SIZE) {
		const chunk = boxes.slice(i, i + BUFFER_SIZE);
		addBoxes(chunk)
			.then((success) => {
				uploaded += chunk.length;
				setUploadProgress(uploaded / BOXES_LENGTH);
				setResults(results => [...results, success]);
				if (uploaded === BOXES_LENGTH) {
					setResults(results => createSummary(results));
					setIsLoading(false);
					setComplete(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
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
