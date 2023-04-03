import { Table, Card, TableHead, TableCell, TableRow, TableBody, Typography, CardContent, Box } from '@mui/material';
import { getBoxes, getScans } from '../service';
import {
	useState, useEffect
} from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';

const statusMap = {
	inprogress: 'warning',
	delivered: 'success',
	problem: 'error'
};

export default function BoxesOverview() {
	const [boxes, setBoxes] = useState([]);
	const [scans, setScans] = useState([]);
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');

	useEffect(() => {
		getBoxes()
			.then(setBoxes)
		getScans()
			.then(setScans)
	}, []);

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
							<TableCell sortDirection="desc">
								Created
							</TableCell>
							<TableCell>
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{boxes.map((box) => {
							const date = new Date(box?.createdAt);
							return (
								<TableRow id={box?.id} onClick={() => {
									setBoxID(box?.id);
									setBoxDialogOpen(true);
								}}
									hover={true}>
									<TableCell>
										<Typography fontFamily={'Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New'} fontSize={'.8rem'}>{box?.id}</Typography>
									</TableCell>
									<TableCell>
										{box?.school}
									</TableCell>
									<TableCell>
										{date.getHours() + ":" + date.getMinutes() + ", " + date.toLocaleDateString()}
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
				<BoxSummary id={boxID} open={boxDialogOpen} setOpen={setBoxDialogOpen} />
			</CardContent>
		</Card>
	);
}
