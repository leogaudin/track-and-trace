import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Polyline, LayerGroup, CircleMarker } from 'react-leaflet';
import { getLatLngCenter, getZoomLevel } from '../../service/mapUtils';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ScanMap({ scans, scansCount }) {
	const [scansLoaded, setScansLoaded] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		if (scans.length === scansCount)
			setScansLoaded(true)
	}, [scans, scansCount])

	let coords = [];
	scans.forEach(scan => {
		coords.push([
			scan.location.coords.latitude,
			scan.location.coords.longitude
		])
	});

	if (scansLoaded && scansCount !== 0) {
		return (
			<MapContainer center={getLatLngCenter(coords)} zoom={getZoomLevel(coords)} scrollWheelZoom={true} style={{ minHeight: '20rem', minWidth: '30rem', borderRadius: 25 }}>
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
									fillColor={scan?.finalDestination ? '#10B981' : (index === 0 ? '#0B71E7' : 'white')}
									fillOpacity={.7}
									color={scan?.finalDestination ? '#10B981' : (index === 0 ? '#0B71E7' : 'white')}
									zIndexOffset={20}
									key={scan?.id}
									radius={(scan?.location.coords.accuracy) / 500 + 1}
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
			<Typography>{t('loading')}</Typography>
		)
	}
}

export default React.memo(ScanMap);
