import { Dialog, DialogContent, Card, Stack, Typography, CardContent, Tooltip, Table, TableHead, TableCell, TableRow, TableBody, Grid } from "@mui/material";
import QRCode from "react-qr-code";
import { timeAgo } from "../service/timeAgo";
import { feature as getCountryName } from '@rapideditor/country-coder';
import Map from "./Map";
import ScansOverview from "./ScansOverview";

export default function BoxSummary({ boxes, scans, id, open, setOpen }) {

	function handleClose() {
		setOpen(false);
	}

	const boxData = boxes.filter(box => { return box.id === id })[0];
	const scanData = scans.filter(scan => { return scan.boxId === id }).sort((a, b) => b.time - a.time);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll='body'
			keepMounted={false}
			maxWidth
		>
			<DialogContent>
				<Typography
					variant='overline'
				>Box summary</Typography>
				<Stack direction={'row'} spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card>
								<CardContent>
									<Typography
										color="text.secondary"
										variant="overline"
									>Informations</Typography>
									<Stack direction={'row'} spacing={5} alignItems={'center'} justifyContent={'space-between'}>
										<Stack direction={'column'} spacing={.5}>
											<Typography>Recipient: <b>{boxData?.school}</b></Typography>
											<Typography>Division: <b>{boxData?.division}</b></Typography>
											<Typography>District: <b>{boxData?.district}</b></Typography>
											<Typography>Zone: <b>{boxData?.zone}</b></Typography>
											<Typography>Institution type: <b>{boxData?.institutionType}</b></Typography>
											<Typography>Person in charge: <b>{boxData?.htName}</b></Typography>
											<Typography>Phone: <b>{boxData?.htPhone}</b></Typography>
											<Typography>Created: <b>{
												new Date(boxData?.createdAt).toLocaleString()
											}</b></Typography>
										</Stack>
										<Stack direction={'column'} spacing={1} alignItems={'center'}>
											<QRCode value={id} size={150} />
											<Typography fontFamily={'Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New'} fontSize={'.7rem'}>{id}</Typography>
										</Stack>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
						{scanData.length ?
							<Grid item xs={12}>
								<ScansOverview boxes={boxes} scans={scanData} disableDialogs />
							</Grid>
							: null}
					</Grid>
					<Map scans={scanData} scansCount={scanData.length} />
				</Stack>
			</DialogContent>
		</Dialog >
	);
}
