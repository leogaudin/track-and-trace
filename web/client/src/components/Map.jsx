import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Polyline, LayerGroup, CircleMarker } from 'react-leaflet';
import { getLatLngCenter } from '../service/mapUtils';
import { Typography } from '@mui/material';


function Map({ scans, scansCount }) {
	const [scansLoaded, setScansLoaded] = useState(false);
	useEffect(() => {
		if (scans.length === scansCount)
			setScansLoaded(true)
	}, [scans])

	let coords = [];
	scans.forEach(scan => {
		coords.push([
			scan.location.coords.latitude,
			scan.location.coords.longitude
		])
	});

	if (scansLoaded && scansCount !== 0) {
		return (
			<MapContainer center={getLatLngCenter(coords)} zoom={20} scrollWheelZoom={true} style={{ minHeight: '20rem', minWidth: '30rem', borderRadius: 25 }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LayerGroup>
					{
						scans.map((scan, index) => {
							return (
								<CircleMarker
									center={[
										scan?.location.coords.latitude,
										scan?.location.coords.longitude
									]}
									fill
									fillColor={index + 1 === scans.length ? '#0B71E7' : 'white'}
									fillOpacity={.7}
									color={index + 1 === scans.length ? '#0B71E7' : 'white'}
									zIndexOffset={20}
								>
									<Popup>
										<code>{scan?.operatorId}</code><br />
										{new Date(scan?.time).toUTCString()}<br />
										{scan?.comment}
									</Popup>
								</CircleMarker>
							);
						})
					}
				</LayerGroup>
				<Polyline positions={coords} color='white' opacity={.7} />
			</MapContainer >
		);
	} else if (scansCount === 0) {
		return null;
	}
	else {
		return (
			// TODO: Implement cool loading
			<Typography>Loading...</Typography>
		)
	}
}

export default React.memo(Map);
