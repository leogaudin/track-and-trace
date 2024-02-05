import { ResponsivePie } from '@nivo/pie'
import InsightWrapper from '../reusable/InsightWrapper';
import { commonProperties } from './index';
import { useTranslation } from 'react-i18next';

export default function ScannedOncePie({sample}) {
	const {t} = useTranslation();

	function getNivoPieData() {
		const data = [
			{
				id: t('noscans'),
				value: 0,
				color: '#E1000F'
			},
			{
				id: t('scannedAtLeastOnce'),
				value: 0,
				color: '#0033C0'
			}
		];

		sample.forEach(box => {
			if (box.scans && box.scans.length > 0)
				data[1].value++;
			else
				data[0].value++;
		});

		return data;
	}

	const data = getNivoPieData();

	return (
		<InsightWrapper title={t('progressFunnel')} width={35} data={data}>
			<ResponsivePie
				{...commonProperties}
				data={data}
				colors={{ scheme: 'set1'}}
				shapeBlending={1}
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
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}

			/>
		</InsightWrapper>
	);
}
