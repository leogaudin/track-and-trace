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
		return sortedScans && sortedScans.map((scan) => {
			const row = [];
			if (!disableDialogs)
				row.push(scan.boxId);
			row.push(scan.countryName);
			row.push(timeAgo(scan.time));
			if (!isMobile) {
				row.push(scan.comment);
				row.push(scan.finalDestination ? '✅' : '');
			}
			return row;
		});
	}, [sortedScans, isMobile]);

	const columns = [];
	if (!disableDialogs)
		columns.push(t('box'))
	columns.push(t('location'), t('time'));
	if (!isMobile)
		columns.push(t('comment'), t('final'));

	return (
		<TableCard
			contentName={t('scans').toLowerCase()}
			columns={columns}
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
