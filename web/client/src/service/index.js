import axios from 'axios';

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
