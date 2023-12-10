import { timeAgo } from '../service/timeAgo';
import React, { useState, useContext, useMemo } from 'react';
import BoxSummary from './BoxSummary';
import TableCard from './reusable/TableCard';
import { useTranslation } from 'react-i18next';
import AppContext from '../context/AppContext';

function ScansOverview({ overrideScans = null, disableDialogs = false, searchEnabled = false }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const {scans, isMobile} = useContext(AppContext);
	const { t } = useTranslation();

	const scansToUse = overrideScans ? overrideScans : scans;

	const sortedScans = useMemo(() => {
		return scansToUse ? scansToUse.sort((a, b) => {
			return new Date(b.time) - new Date(a.time);
		}) : null;
	}, [scansToUse]);

	const rows = useMemo(() => {
		return sortedScans
		  ? sortedScans.map((scan) => {
			  return isMobile
				? [
					scan.boxId,
					scan.countryName,
					timeAgo(scan.time)
				]
				: [
					scan.boxId,
					scan.countryName,
					timeAgo(scan.time),
					scan.comment,
					scan.finalDestination ? '✅' : ''
				];
			})
		  : null;
	}, [sortedScans, isMobile]);

	return (
		<TableCard
			contentName={t('scans').toLowerCase()}
			columns={
				isMobile
				? [t('box'), t('location'), t('time')]
				: [t('box'), t('location'), t('time'), t('comment'), t('final')]
			}
			rows={rows}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
			searchEnabled={searchEnabled}
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

export default React.memo(ScansOverview);
