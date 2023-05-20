import React from 'react';
import ScansOverview from '../components/ScansOverview';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function Scans({ boxes, scans }) {
	return (
		<>
			<Helmet>
				<title>Scans - Track-and-Trace</title>
				<meta name="description" content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times." />
			</Helmet>
			<Box
				padding={3}
				display={'flex'}
				width={'100%'}
			>
				<ScansOverview boxes={boxes} scans={scans} />
			</Box>
		</>
	);
}
