import { useState, useContext } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './TableCard';
import { getProgress } from '../service/progress';
import { colorsMap, textsMap } from './constants';
import { Skeleton, useMediaQuery } from '@mui/material';
import AppContext from '../context/AppContext';

export default function BoxesOverview({ pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const isMobile = !useMediaQuery(theme => theme.breakpoints.up('lg'));
	const {boxes, scans} = useContext(AppContext);

	return (
		<TableCard
			contentName='boxes'
			columns={
				isMobile
				? ['ID', 'Recipient', 'Status']
				: ['ID', 'Project', 'Recipient', 'Created', 'Status']

			}
			rows={boxes ? boxes.map((box) => {
				const boxScans = scans ? scans.filter(scan => { return scan.boxId === box.id }) : null;
				const progress = getProgress(boxScans);
				if (isMobile)
					return [
						box.id,
						box.school,
						<SeverityPill color={colorsMap[progress]}>
							{textsMap[progress]}
						</SeverityPill>
					]
				else
					return [
						box.id,
						box.project,
						box.school,
						timeAgo(box.createdAt),
						<SeverityPill color={colorsMap[progress]}>
							{textsMap[progress]}
						</SeverityPill>
					]
			}) : null}
			pageSize={pageSize}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
		>
			<BoxSummary
				id={boxID}
				open={boxDialogOpen}
				setOpen={setBoxDialogOpen}
			/>
		</TableCard>
	);
}
