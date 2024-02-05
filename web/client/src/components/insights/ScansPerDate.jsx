import { Line, ResponsiveLine } from "@nivo/line";
import { commonProperties } from './index';
import { Card } from "@mui/material";
import InsightWrapper from "../reusable/InsightWrapper";
import { useTranslation } from 'react-i18next';

export default function ScansPerDate({project}) {
	const {t} = useTranslation();

	function getNivoScansOverTime() {
		const scans = project.reduce((accumulator, box) => {
			if (box.scans && Array.isArray(box.scans))
				return accumulator.concat(box.scans);
			return accumulator;
		}, []);

		const scanNumberByDate = {};
		scans.forEach(scan => {
			const date = new Date(scan.time);
			const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			if (scanNumberByDate[dateString]) {
				scanNumberByDate[dateString]++;
			} else {
				scanNumberByDate[dateString] = 1;
			}
		});

		const data = [];
		for (const date in scanNumberByDate) {
			data.push({ x: date, y: scanNumberByDate[date] });
		}

		return [
			{
				id: t('scans'),
				color: "#0033C0",
				data: data
			}
		];
	}

	const data = getNivoScansOverTime();

	return (
		<InsightWrapper title={t('scansPerDate')} data={data}>
			<ResponsiveLine
				{...commonProperties}
				areaOpacity={1}
				animate
				axisBottom={{
					format: '%b %d',
					legendOffset: -12,
					tickValues: 'every 10 days'
				}}
				axisLeft={{
					legendOffset: 12,
					tickValues: 3
				}}
				curve="step"
				data={data}
				enableArea
				pointSize={5}
				pointColor={'#fff'}
				pointBorderColor={{ from: 'serieColor' }}
				pointBorderWidth={2}
				xFormat="time:%Y-%m-%d"
				xScale={{
					format: '%Y-%m-%d',
					precision: 'day',
					type: 'time',
					useUTC: false
				}}
				colors={{ 'datum': 'color' }}
			/>
		</InsightWrapper>
	);
}
