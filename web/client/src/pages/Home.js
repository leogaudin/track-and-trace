import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import BoxesOverview from '../components/BoxesOverview';
import { getBoxes } from '../service';

export default function Home() {
	const [boxes, setBoxes] = useState([]);

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
	}, [])

	return (
		<Grid
			container
			padding={3}
			spacing={2}
			alignItems='stretch'
		>
			<Grid item xs={4}>
				<BoxesOverview boxes={boxes} />
			</Grid>
			<Grid item xs={8}>
				<BoxesOverview boxes={boxes} />
			</Grid>
			<Grid item xs={8}>
				<BoxesOverview boxes={boxes} />
			</Grid>
			<Grid item xs={4}>
				<BoxesOverview boxes={boxes} />
			</Grid>
		</Grid>
	);
}
