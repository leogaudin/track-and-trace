import { Table, Card, TableHead, TableCell, TableRow, TableBody, Typography, CardContent, Box, Tooltip } from '@mui/material';
import { getBoxes, getScans } from '../service';
import {
	useState, useEffect
} from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';
import { timeAgo } from '../service/timeAgo'

const statusMap = {
	inprogress: 'warning',
	delivered: 'success',
	problem: 'error'
};

export default function BoxesOverview({ boxes, scans }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const sortedBoxes = boxes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<Card
			style={{
				width: '100%',
				height: '100%',
				maxHeight: '25rem',
				overflow: 'auto'
			}}>
			<CardContent>
				<Typography
					variant='overline'
				>Your tracked items</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								ID
							</TableCell>
							<TableCell>
								Recipient
							</TableCell>
							<TableCell>
								Created
							</TableCell>
							<TableCell>
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedBoxes.map((box) => {
							return (
								<TableRow id={box?.id} onClick={() => {
									setBoxID(box?.id);
									setBoxDialogOpen(true);
								}}
									hover={true}>
									<TableCell>
										<Typography fontSize={'.8rem'}><code>{box?.id}</code></Typography>
									</TableCell>
									<TableCell>
										{box?.school}
									</TableCell>
									<TableCell>
										<Tooltip title={new Date(box?.createdAt).toUTCString()}>
											<Typography fontSize={'.9rem'}>
												{timeAgo(box?.createdAt)}
											</Typography>
										</Tooltip>
									</TableCell>
									<TableCell>
										<SeverityPill color={statusMap['inprogress']}>
											{'In Progress'}
										</SeverityPill>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
				<BoxSummary boxes={boxes} scans={scans} id={boxID} open={boxDialogOpen} setOpen={setBoxDialogOpen} />
			</CardContent>
		</Card>
	);
}
