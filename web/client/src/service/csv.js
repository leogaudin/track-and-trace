import Papa from 'papaparse';
import { addBoxes } from './index';
const lzstring = require('lz-string');

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
				adminId: user.id,
				createdAt: new Date().getTime()
			});
		},
		complete: () => {
			boxes.shift();
			uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete);
		}
	})
}

function uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete) {
	const BUFFER_LENGTH = 15;
	const numBoxes = boxes.length;
	let bufferStartIndex = 0;
	const responses = [];

	const processBuffer = (buffer) => {
		const payload = JSON.stringify(buffer);
		const compressedPayload = {
			data: lzstring.compressToEncodedURIComponent(payload)
		};
		addBoxes(compressedPayload)
			.then((res) => {
				responses.push(res);

				setUploadProgress((bufferStartIndex + buffer.length) / numBoxes);

				if (bufferStartIndex + buffer.length < numBoxes) {
					bufferStartIndex += buffer.length;
					const nextBuffer = boxes.slice(bufferStartIndex, bufferStartIndex + BUFFER_LENGTH);
					processBuffer(nextBuffer);
				} else {
					const summary = createSummary(responses);
					setResults(summary);
					setIsLoading(false);
					setComplete(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const initialBuffer = boxes.slice(0, BUFFER_LENGTH);
	processBuffer(initialBuffer);
}

function createSummary(results) {
	const invalid = results.flatMap((res) => res.invalidInstances);
	const valid = results.flatMap((res) => res.validInstances);
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
