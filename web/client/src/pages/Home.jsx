import React from 'react';
import { Grid } from '@mui/material';
import BoxesOverview from '../components/BoxesOverview';
import ScansOverview from '../components/ScansOverview';

export default function Home({ boxes, scans }) {
	return (
		<Grid
			container
			padding={3}
			spacing={2}
			alignItems='stretch'
		>
			<Grid item xs={12}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
			<Grid item xs={12}>
				<ScansOverview boxes={boxes} scans={scans} />
			</Grid>
		</Grid>
	);
}
