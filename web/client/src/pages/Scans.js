import React from 'react';
import ScansOverview from '../components/ScansOverview';
import { Box } from '@mui/material';

export default function Scans({ boxes, scans }) {
	return (
		<Box
			padding={3}
			display={'flex'}
			width={'100%'}
		>
			<ScansOverview boxes={boxes} scans={scans} />
		</Box>
	);
}
