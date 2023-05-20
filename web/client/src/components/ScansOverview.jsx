import { Alert, Table, Card, TableHead, TableCell, TableRow, TableBody, Typography, CardContent, Tooltip } from '@mui/material';
import { timeAgo } from '../service/timeAgo';
import { feature as getCountryName } from '@rapideditor/country-coder';
import { useState } from 'react';
import BoxSummary from './BoxSummary';
import SkeletonTable from './SkeletonTable';
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

	// if (scans !== null && boxes !== null)
	// return (
	// 	<Card
	// 		style={{
	// 			width: '100%',
	// 			height: '100%',
	// 			overflow: 'auto'
	// 		}}>
	// 		{!boxes.length || !scans.length
	// 			? (
	// 				<CardContent>
	// 					<Typography
	// 						variant="overline"
	// 					>Scans</Typography>
	// 					{
	// 						<SkeletonTable rows={10} />
	// 					}
	// 				</CardContent>
	// 			)
	// 			: (
	// 				<CardContent>
	// 					<Typography
	// 						variant="overline"
	// 					>Scans</Typography>
	// 					<Table>
	// 						<TableHead>
	// 							<TableRow>
	// 								<TableCell>
	// 									Box
	// 								</TableCell>
	// 								<TableCell>
	// 									Operator
	// 								</TableCell>
	// 								<TableCell>
	// 									Location
	// 								</TableCell>
	// 								<TableCell sortDirection={'asc'}>
	// 									Time
	// 								</TableCell>
	// 								<TableCell>
	// 									Comment
	// 								</TableCell>
	// 							</TableRow>
	// 						</TableHead>
	// 						<TableBody>
	// 							{scanData.map(scan => {
	// 								return (
	// 									<TableRow
	// 										id={scan?.id}
	// 										key={scan?.id}
	// 										onClick={() => {
	// 											setBoxID(scan?.boxId);
	// 											setBoxDialogOpen(true);
	// 										}}
	// 										hover
	// 									>
	// 										<TableCell>
	// 											<Typography fontSize={'.8rem'}><code>{scan?.boxId}</code></Typography>
	// 										</TableCell>
	// 										<TableCell>
	// 											<Typography fontSize={'.8rem'}><code>{scan?.operatorId}</code></Typography>
	// 										</TableCell>
	// 										<TableCell>
	// 											{getCountryName([scan?.location.coords.longitude, scan?.location.coords.latitude], { level: 'territory' }).properties.nameEn}
	// 										</TableCell>
	// 										<TableCell>
	// 											<Tooltip title={new Date(scan?.time).toLocaleString()}>
	// 												<Typography fontWeight={'bold'} fontSize={'.9rem'}>
	// 													{timeAgo(scan?.time)}
	// 												</Typography>
	// 											</Tooltip>
	// 										</TableCell>
	// 										<TableCell>
	// 											<Typography fontSize={'smaller'} fontStyle={'italic'}>
	// 												{scan?.comment}
	// 											</Typography>
	// 										</TableCell>
	// 									</TableRow>
	// 								)
	// 							})}
	// 						</TableBody>
	// 					</Table>
	// 					<BoxSummary
	// 						boxes={boxes}
	// 						scans={scanData}
	// 						id={boxID}
	// 						open={disableDialogs ? null : boxDialogOpen}
	// 						setOpen={disableDialogs ? null : setBoxDialogOpen}
	// 					/>
	// 				</CardContent>
	// 			)
	// 		}
	// 	</Card>
	// );
	// else
	// 	return (
	// 		<Card
	// 			style={{
	// 				width: '100%',
	// 				height: '100%',
	// 				overflow: 'auto'
	// 			}}
	// 		>
	// 			<CardContent>
	// 				<Typography
	// 					variant="overline"
	// 				>Scans</Typography>
	// 				<Alert severity='info'>
	// 					You have no scans on your boxes yet.
	// 				</Alert>
	// 			</CardContent>
	// 		</Card>
	// 	);
}
