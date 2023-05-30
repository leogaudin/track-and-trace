import { useState } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './TableCard';
import { getProgress } from '../service/progress';
import { colorsMap, textsMap } from './constants';

export default function BoxesOverview({ boxes, scans, pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');

	return (
		<TableCard
			contentName='boxes'
			columns={['ID', 'Project', 'Recipient', 'Created', 'Status']}
			rows={boxes ? boxes.map((box) => {
				const boxScans = scans ? scans.filter(scan => { return scan.boxId === box.id }) : null;
				const progress = getProgress(boxScans);
				return [
					box.id,
					box.project,
					box.school,
					timeAgo(box.createdAt),
					<SeverityPill color={colorsMap[progress]}>{textsMap[progress]}</SeverityPill>
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
