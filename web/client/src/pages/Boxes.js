import React from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { Box } from '@mui/material';

export default function Boxes({ boxes, scans }) {
	return (
		<Box
			padding={3}
			display={'flex'}
			width={'100%'}
		>
			<BoxesOverview boxes={boxes} scans={scans} />
		</Box>
	);
}
