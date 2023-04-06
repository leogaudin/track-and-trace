import React, { useState, useEffect } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { Box } from '@mui/material';
import { getBoxes, getScans } from '../service';

export default function Boxes() {
	const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
		getScans()
			.then(setScans)
	}, [])

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
