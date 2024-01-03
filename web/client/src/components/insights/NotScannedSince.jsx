import { ResponsivePie } from '@nivo/pie'
import InsightWrapper from '../reusable/InsightWrapper';
import { commonProperties } from './index';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Alert, Slider, Stack } from '@mui/material';

export default function NotScannedSince({project}) {
	const {t} = useTranslation();
	const [since, setSince] = useState(3);
	function getNivoPieData(days) {
		const data = [
			{
				id: t('scanned'),
				value: 0,
			},
			{
				id: t('notScanned'),
				value: 0,
			}
		];

		const now = new Date();
		const nowTimestamp = now.getTime();
		const daysTimestamp = days * 24 * 60 * 60 * 1000;
		const sinceTimestamp = nowTimestamp - daysTimestamp;

		project.forEach(box => {
			if (box.scans && box.scans.length > 0) {
				const lastScan = box.scans[box.scans.length - 1];
				const isDelivered = box.scans.some(scan => scan.finalDestination);
				if (lastScan.time > sinceTimestamp && !isDelivered)
					data[0].value++;
				else if (!isDelivered)
					data[1].value++;
			}
		});

		return data;
	}

	function getNeverScanned() {
		let neverScanned = 0;
		project.forEach(box => {
			if (!box.scans || box.scans.length === 0)
				neverScanned++;
		});
		return neverScanned;
	}

	// function getDelivered() {
	// 	let delivered = 0;
	// 	project.forEach(box => {
	// 		if (box.scans.some(scan => scan.finalDestination))
	// 			delivered++;
	// 	});
	// 	return delivered;
	// }

	return (
		<InsightWrapper title={t('notScannedInThePast', {count: since})} height={50}>
			<Stack style={{height: '75%', width: '100%'}}>
				{getNeverScanned() ?
				<Alert severity="info" style={{height: '20%', marginTop: 3}}>
					{t('thereAreXNeverScanned', {count: getNeverScanned()})}
				</Alert>
				: false}
				{/* {getDelivered() ?
				<Alert severity="success" style={{height: '20%', marginTop: 3}}>
					{t('thereAreXDelivered', {count: getDelivered()})}
				</Alert>
				: false} */}
				<ResponsivePie
					{...commonProperties}
					data={getNivoPieData(since)}
					colors={['#0949FF', '#F04438', '#D3D3D3']}
					innerRadius={0.5}
					padAngle={0.7}
					cornerRadius={3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					borderColor={{
						from: 'color',
						modifiers: [
							[
								'darker',
								0.2
							]
						]
					}}
					enableArcLinkLabels={false}
					// arcLinkLabelsTextColor="#333333"
					// arcLinkLabelsThickness={2}
					// arcLinkLabelsColor={{ from: 'color' }}
				/>
				<Slider
					defaultValue={30}
					value={since}
					onChange={(event, value) => setSince(value)}
					step={1}
					valueLabelDisplay="auto"
					min={1}
					max={14}
				/>
			</Stack>
		</InsightWrapper>
	);
}
