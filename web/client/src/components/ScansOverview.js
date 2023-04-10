import { Table, Card, TableHead, TableCell, TableRow, TableBody, Typography, CardContent, Tooltip } from '@mui/material';
import { timeAgo } from '../service/timeAgo';
import { feature as getCountryName } from '@rapideditor/country-coder';

export default function ScansOverview({ boxes, scans }) {
	const scanData = scans.sort((a, b) => b.time - a.time);

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
					color="text.secondary"
					variant="overline"
				>Scans</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								Box
							</TableCell>
							<TableCell>
								Operator
							</TableCell>
							<TableCell>
								Location
							</TableCell>
							<TableCell sortDirection={'asc'}>
								Time
							</TableCell>
							<TableCell>
								Comment
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scanData.map(scan => {
							return (
								<TableRow
									id={scan?.id}
									hover={true}
								>
									<TableCell>
										<Typography><code>{scan?.boxId}</code></Typography>
									</TableCell>
									<TableCell>
										<Typography><code>{scan?.operatorId}</code></Typography>
									</TableCell>
									<TableCell>
										{getCountryName([scan?.location.coords.longitude, scan?.location.coords.latitude], { level: 'territory' }).properties.nameEn}
									</TableCell>
									<TableCell>
										<Tooltip title={new Date(scan?.time).toUTCString()}>
											<Typography fontWeight={'bold'}>
												{timeAgo(scan?.time)}
											</Typography>
										</Tooltip>
									</TableCell>
									<TableCell>
										<Typography fontSize={'smaller'} fontStyle={'italic'}>
											{scan?.comment}
										</Typography>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
