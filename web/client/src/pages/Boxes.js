import React, { useState, useEffect } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { Box } from '@mui/material';
import { getBoxes } from '../service';

export default function Boxes() {
	const [boxes, setBoxes] = useState([]);

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
	}, [])
	return (
		<Box
			padding={3}
			display={'flex'}
			width={'100%'}
		>
			<BoxesOverview boxes={boxes} />
		</Box>
	);
}
