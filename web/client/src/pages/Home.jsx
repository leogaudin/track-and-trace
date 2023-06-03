import React from 'react';
import { Grid } from '@mui/material';
import BoxesOverview from '../components/BoxesOverview';
import { Helmet } from 'react-helmet';
import ProgressOverview from '../components/ProgressOverview'

export default function Home({ boxes, scans }) {
	return (
		<>
			<Helmet>
				<title>Home - Track-and-Trace</title>
				<meta name="description" content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times." />
			</Helmet>
			<Grid
				container
				padding={3}
				spacing={2}
				alignItems='stretch'
			>
				<Grid item xs={12}>
					<ProgressOverview boxes={boxes} scans={scans} />
				</Grid>
				<Grid item xs={12}>
					<BoxesOverview boxes={boxes} scans={scans} />
				</Grid>
			</Grid>
		</>
	);
}
