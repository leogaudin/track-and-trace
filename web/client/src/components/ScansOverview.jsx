import { timeAgo } from '../service/timeAgo';
import { useState } from 'react';
import BoxSummary from './BoxSummary';
import TableCard from './TableCard';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ScansOverview({ boxes, scans, disableDialogs = false }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const isMobile = !useMediaQuery(theme => theme.breakpoints.up('lg'));
	const { t } = useTranslation();

	return (
		<TableCard
			contentName={t('scans').toLowerCase()}
			columns={
				isMobile
				? [t('box'), t('location'), t('time')]
				: [t('box'), t('location'), t('time'), t('comment'), t('final')]
			}
			rows={scans && scans[0] ? scans.map(scan => {
				if (isMobile)
					return [
						scan.boxId,
						scan.countryName,
						timeAgo(scan.time)
					]
				else
					return [
						scan.boxId,
						scan.countryName,
						timeAgo(scan.time),
						scan.comment,
						scan.finalDestination ? '✅' : ''
					]
			}) : null}
			pageSize={10}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
			searchEnabled={false}
		>
			{disableDialogs
			? null
			: <BoxSummary
				boxes={boxes}
				scans={scans}
				id={boxID}
				open={boxDialogOpen}
				setOpen={setBoxDialogOpen}
			/>}
		</TableCard>
	);
}
