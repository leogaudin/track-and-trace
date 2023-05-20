import { timeAgo } from '../service/timeAgo';
import { feature as getCountryName } from '@rapideditor/country-coder';
import { useState } from 'react';
import BoxSummary from './BoxSummary';
import TableCard from './TableCard';

export default function ScansOverview({ boxes, scans, disableDialogs = false }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');

	return (
		<TableCard
			contentName='scans'
			columns={['Box', 'Location', 'Time', 'Comment']}
			rows={scans ? scans.map(scan => {
				return [
					scan.boxId,
					getCountryName([scan?.location.coords.longitude, scan?.location.coords.latitude], { level: 'territory' }).properties.nameEn,
					timeAgo(scan.time),
					scan.comment
				]
			}) : null}
			sortBy='time'
			pageSize={10}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
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
