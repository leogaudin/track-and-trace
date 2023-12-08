import { timeAgo } from '../service/timeAgo';
import { useState, useContext } from 'react';
import BoxSummary from './BoxSummary';
import TableCard from './TableCard';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppContext from '../context/AppContext';


export default function ScansOverview({ overrideScans = null, disableDialogs = false }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const {scans, isMobile} = useContext(AppContext);

	const { t } = useTranslation();

	const scansToUse = overrideScans ? overrideScans : scans;

	const sortedScans = scansToUse ? scansToUse.sort((a, b) => {
		return new Date(b.time) - new Date(a.time);
	}) : null;

	return (
		<TableCard
			contentName={t('scans').toLowerCase()}
			columns={
				isMobile
				? [t('box'), t('location'), t('time')]
				: [t('box'), t('location'), t('time'), t('comment'), t('final')]
			}
			rows={sortedScans && sortedScans[0] ? sortedScans.map(scan => {
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
				id={boxID}
				open={boxDialogOpen}
				setOpen={setBoxDialogOpen}
			/>}
		</TableCard>
	);
}
