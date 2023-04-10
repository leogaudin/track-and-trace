import axios from 'axios';

export function addBox(box) {
	return new Promise(resolve => {
		axios.post("http://localhost:3000/api/box", box, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.status === 201 && res.data)
			.then(res => res.data)
			.then(resolve)
			.catch(console.error);
	});
}

export function getBoxes() {
	return new Promise(resolve => {
		axios.get("http://localhost:3000/api/boxes")
			.then(res => res.status === 200 && res.data)
			.then(res => res.data)
			.then(resolve)
			.catch(console.error);
	});
}

export function getBox(id) {
	return new Promise(resolve => {
		axios.get("http://localhost:3000/api/box/" + id)
			.then(res => res.status === 200 && res.data)
			.then(res => res.data)
			.then(resolve)
			.catch(console.error);
	});
}

export function getScans() {
	return new Promise(resolve => {
		axios.get("http://localhost:3000/api/scans")
			.then(res => res.status === 200 && res.data)
			.then(res => res.data)
			.then(resolve)
			.catch(console.error);
	});
}

export function getAdmins() {
	return new Promise(resolve => {
		axios.get("http://localhost:3000/api/admins")
			.then(res => res.status === 200 && res.data)
			.then(res => res.data)
			.then(resolve)
			.catch(console.error);
	});
}

export function getCity(latitude, longitude) {
	return new Promise(resolve => {
		axios.get('https://api-bdc.net/data/reverse-geocode?latitude=' + latitude + '&longitude=' + longitude + '&localityLanguage=en&key=' + 'bdc_e27b27abd76b4c5dba5671d1de24d039')
			.then(res => res.data.city + ', ' + res.data.countryName)
			.then(resolve)
	})
}
