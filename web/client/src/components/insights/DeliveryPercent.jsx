import React from 'react';
import { Typography, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { calculateDeliveryPercentage } from '../../service/statistics';

export default function DeliveryPercent({ sample, sampleName}) {
	const { t } = useTranslation();
	const deliveryPercentage = parseFloat(calculateDeliveryPercentage(sample));
	return (
		<>
			<Typography variant="subtitle1">{sampleName}</Typography>
			<Typography variant="h4" component="div" gutterBottom>
				{deliveryPercentage.toFixed(2)}% <span style={{fontWeight: 200, fontSize: 'smaller'}}>{t('delivered').toLowerCase()}</span>
			</Typography>
			<LinearProgress color={'success'} variant="determinate" value={deliveryPercentage} />
		</>
	);
}
