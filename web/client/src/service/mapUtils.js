function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in
 *   degrees.
 */
export function getLatLngCenter(latLngInDegr) {
	let LATIDX = 0;
	let LNGIDX = 1;
	let sumX = 0;
	let sumY = 0;
	let sumZ = 0;

	for (let i = 0; i < latLngInDegr.length; i++) {
		let lat = degr2rad(latLngInDegr[i][LATIDX]);
		let lng = degr2rad(latLngInDegr[i][LNGIDX]);
		// sum of cartesian coordinates
		sumX += Math.cos(lat) * Math.cos(lng);
		sumY += Math.cos(lat) * Math.sin(lng);
		sumZ += Math.sin(lat);
	}

	let avgX = sumX / latLngInDegr.length;
	let avgY = sumY / latLngInDegr.length;
	let avgZ = sumZ / latLngInDegr.length;

	// convert average x, y, z coordinate to latitude and longtitude
	let lng = Math.atan2(avgY, avgX);
	let hyp = Math.sqrt(avgX * avgX + avgY * avgY);
	let lat = Math.atan2(avgZ, hyp);

	return ([rad2degr(lat), rad2degr(lng)]);
}
