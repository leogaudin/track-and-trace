import Papa from 'papaparse';
import { addBoxes } from './index';

function isCSVValid(file) {
	// check if the file is a csv
	if (file.type !== 'text/csv')
		return 'File is not CSV';
	return 1;
}

function parseCSV(text, setUploadProgress, setResults, setIsLoading, setComplete) {
	let boxes = [];
	Papa.parse(text, {
		worker: true,
		step: (element) => {
			const box = {
				id: element.data[0],
				division: element.data[1],
				district: element.data[2],
				zone: element.data[3],
				school: element.data[4],
				htName: element.data[5],
				htPhone: element.data[6],
				institutionType: element.data[7],
				adminId: 'lecuistot'
			};
			boxes.push(box);
		},
		complete: () => {
			uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete);
		}
	})
}

function uploadBoxes(boxes, setUploadProgress, setResults, setIsLoading, setComplete) {
	const BOXES_LENGTH = boxes.length - 1;
	const BUFFER_SIZE = 21;
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
	}
}

function createSummary(results) {
	let output = {
		invalidBoxes: [],
		validBoxesToCreate: []
	};
	results.forEach((result) => {
		if (result.hasOwnProperty('invalidBoxes'))
			result.invalidBoxes.forEach((box) => {
				output.invalidBoxes.push(box);
			})
		if (result.hasOwnProperty('validBoxesToCreate'))
			result.validBoxesToCreate.forEach((box) => {
				output.validBoxesToCreate.push(box);
			})
	})
	return (output);
}

export function handleCSV(files, setUploadProgress, setResults, setIsLoading, setComplete) {
	const file = files[0];
	// check if the file is a csv
	if (isCSVValid(file) !== 1)
		throw Error(isCSVValid(file));
	// parse the csv file
	file.text()
		.then((data) => {
			parseCSV(
				data,
				setUploadProgress,
				setResults,
				setIsLoading,
				setComplete
			)
		})
		.catch((error) => {
			console.log(error);
		})
}
