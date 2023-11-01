import React from 'react';
import { Typography, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function DeliveryPercent({projectName, deliveryPercentage}) {
	const { t } = useTranslation();
	return (
		<>
			<Typography variant="subtitle1">{projectName}</Typography>
			<Typography variant="h4" component="div" gutterBottom>
				{deliveryPercentage}% <span style={{fontWeight: 200, fontSize: 'smaller'}}>{t('delivered').toLowerCase()}</span>
			</Typography>
			<LinearProgress color={'success'} variant="determinate" value={deliveryPercentage} />
		</>
	);
}
