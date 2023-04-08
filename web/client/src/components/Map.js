import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Popup, Polyline, LayerGroup, Circle, CircleMarker } from 'react-leaflet';
import { getLatLngCenter } from '../service/mapUtils';
import { Avatar, Typography } from '@mui/material';
import { Marker, MarkerLayer } from 'react-leaflet-marker';


function Map({ scans }) {
	const [scansLoaded, setScansLoaded] = useState(false);

	useEffect(() => {
		if (scans.length > 0)
			setScansLoaded(true)
	}, [scans])

	let coords = [];
	scans.forEach(scan => {
		coords.push([
			scan.location.coords.latitude,
			scan.location.coords.longitude
		])
	});

	if (scansLoaded) {
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
									fillColor={index + 1 === scans.length ? 'blue' : '#424242'}
									fillOpacity={.7}
									color={index + 1 === scans.length ? 'blue' : '#424242'}
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
				<Polyline positions={coords} color='#424242' opacity={.7} />
			</MapContainer >
		);
	} else {
		return (
			// TODO: Implement cool loading
			<Typography>Loading...</Typography>
		)
	}
}

export default React.memo(Map);
