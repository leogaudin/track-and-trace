import { ResponsiveFunnel } from '@nivo/funnel'
import InsightWrapper from '../InsightWrapper';
import { commonProperties } from './index';
import { useTranslation } from 'react-i18next';

export default function ProgressFunnel({project}) {
	const {t} = useTranslation();
	function getNivoFunnelData(project) {
		const data = [
			{
				id: t('total'),
				value: 0,
				color: '#00268E'
			},
			{
				id: t('scannedAtLeastOnce'),
				value: 0,
				color: '#0033C0'
			},
			{
				id: t('delivered'),
				value: 0,
				color: '#0949FF'
			}
		];

		project.forEach(box => {
			data[0].value++;
			if (box.scans && box.scans.length > 0) {
				const lastScan = box.scans[box.scans.length - 1];
				if (lastScan.finalDestination)
					data[2].value++;
				data[1].value++;
			}
		});

		return data;
	}

	return (
		<InsightWrapper title={t('progressFunnel')} width={35}>
			<ResponsiveFunnel
				{...commonProperties}
				isInteractive={true}
				currentPartSizeExtension={5}
				currentBorderWidth={10}
				data={getNivoFunnelData(project)}
				colors={{ 'datum': 'color' }}
				labelColor="#ffffff"
				shapeBlending={1}
				motionConfig="gentle"
				tooltip={({part}) =>
					<div style={{
						padding: 12,
						color: '#222222',
						background: '#fff'
					}}>
						<span>
							{part.data.id}: <strong>{part.formattedValue}</strong>
						</span>
					</div>
				}
			/>
		</InsightWrapper>
	);
}
