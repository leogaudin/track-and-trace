const fs = require('fs');

const borders = JSON.parse(fs.readFileSync('../assets/borders.json', 'utf8'));

function reverseGeocode(longitude, latitude, countriesJSON) {
	for (const country of countriesJSON.features) {
		if (country.geometry.type === "MultiPolygon") {
			for (const polygon of country.geometry.coordinates) {
				if (isPointInsidePolygon(longitude, latitude, polygon)) {
					return country.properties;
				}
			}
		}
	}
	return null;
}

function isPointInsidePolygon(x, y, polygon) {
	let inside = false;
	for (let i = 0, j = polygon[0].length - 1; i < polygon[0].length; j = i++) {
		const xi = polygon[0][i][0],
			yi = polygon[0][i][1];
		const xj = polygon[0][j][0],
			yj = polygon[0][j][1];

		const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

const getCountryName = (req, res) => {
	const { longitude, latitude } = req.body;

	const countryInfo = reverseGeocode(Number(longitude), Number(latitude), borders);

	if (countryInfo) {
		return res.status(200).json({ country: countryInfo.nameEn });
	} else {
		return res.status(404).json({ error: 'No country found for the given coordinates.' });
	}
};

module.exports = {
	getCountryName,
};
