import React from 'react';
import { Typography, LinearProgress } from '@mui/material';

export default function DeliveryPercent({projectName, deliveryPercentage}) {
	return (
		<>
			<Typography variant="subtitle1">{projectName}</Typography>
			<Typography variant="h4" component="div" gutterBottom>
				{deliveryPercentage}% <span style={{fontWeight: 200, fontSize: 'smaller'}}>delivered</span>
			</Typography>
			<LinearProgress color={'success'} variant="determinate" value={deliveryPercentage} />
		</>
	);
}
