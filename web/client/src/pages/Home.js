import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import BoxesOverview from '../components/BoxesOverview';
import { getBoxes, getScans } from '../service';

export default function Home() {
	const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
		getScans()
			.then(setScans)
	}, [])

	return (
		<Grid
			container
			padding={3}
			spacing={2}
			alignItems='stretch'
		>
			<Grid item xs={4}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
			<Grid item xs={8}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
			<Grid item xs={8}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
			<Grid item xs={4}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
		</Grid>
	);
}
