import { useState } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './TableCard';

const statusMap = {
	inprogress: 'warning',
	delivered: 'success',
	problem: 'error'
};

export default function BoxesOverview({ boxes, scans, pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');

	return (
		<TableCard
			contentName='boxes'
			columns={['ID', 'Recipient', 'Created', 'Status']}
			rows={boxes ? boxes.map((box) => {
				return [
					box.id,
					box.school,
					timeAgo(box.createdAt),
					<SeverityPill color={statusMap['inprogress']}>{'In Progress'}</SeverityPill>
				]
			}) : null}
			pageSize={pageSize}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
		>
			<BoxSummary
				boxes={boxes}
				scans={scans}
				id={boxID}
				open={boxDialogOpen}
				setOpen={setBoxDialogOpen}
			/>
		</TableCard>
	);
}
