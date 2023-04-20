import { Table, Card, TableHead, TableCell, TableRow, TableBody, Typography, CardContent, Box, Tooltip, Pagination, Stack, Skeleton } from '@mui/material';
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

export default function BoxesOverview({ boxes, scans, limit, pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const [page, setPage] = useState(1);

	const sortedBoxes = boxes
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		.slice((page - 1) * pageSize, page * pageSize);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
			<CardContent>
				<Typography variant="overline">Your tracked items</Typography>
				{(boxes.length !== 0) ?
					(
						<Stack direction='column' spacing={3} alignItems={'center'}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>Recipient</TableCell>
										<TableCell>Created</TableCell>
										<TableCell>Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sortedBoxes.map((box) => (
										<TableRow key={box?.id} onClick={() => {
											setBoxID(box?.id);
											setBoxDialogOpen(true);
										}} hover>
											<TableCell>
												<Typography fontSize={'.8rem'}>
													<code>{box?.id}</code>
												</Typography>
											</TableCell>
											<TableCell>{box?.school}</TableCell>
											<TableCell>
												<Typography fontSize={'.9rem'}>
													{timeAgo(box?.createdAt)}
												</Typography>
											</TableCell>
											<TableCell>
												<SeverityPill color={statusMap['inprogress']}>
													{'In Progress'}
												</SeverityPill>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Pagination
								count={Math.ceil(boxes.length / pageSize)}
								page={page}
								onChange={handleChangePage}
								color='primary'
								variant='outlined'
								defaultPage={0}
							/>
						</Stack>
					)
					:
					(
						<Stack direction={'column'} spacing={1}>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
							<Skeleton variant='rounded' height={50}/>
						</Stack>
					)
				}
				<BoxSummary
					boxes={boxes}
					scans={scans}
					id={boxID}
					open={boxDialogOpen}
					setOpen={setBoxDialogOpen}
				/>
			</CardContent>
		</Card>
	);
}
