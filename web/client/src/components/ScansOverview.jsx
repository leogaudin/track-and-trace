import { timeAgo } from '../service/timeAgo';
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
					scan.countryName,
					timeAgo(scan.time),
					scan.comment
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
