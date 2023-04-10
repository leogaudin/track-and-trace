import Papa from 'papaparse';
import { addBox } from '.';

function isCSVValid(file) {
	if (file.type !== 'text/csv')
		return 'File is not CSV';
	return 'OK';
}

function parseCSV(text, incrementCounter) {
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
			addBox(box)
				.then((res) => {
					console.log(res);
					incrementCounter();
				});
		},
		complete: (results) => {
			console.log('Uploaded all the boxes')
		}
	})
}

export function handleCSV(files, incrementCounter, setLines) {
	const file = files[0];
	if (isCSVValid(file) !== 'OK')
		throw Error(isCSVValid(file));
	file.text()
		.then((data) => {
			const lines = data.split("\n").length;
			setLines(lines);
			parseCSV(data, incrementCounter);
		})
}
