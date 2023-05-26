import { Dialog, DialogContent, Stack, Typography, Grid } from "@mui/material";
import Map from "./ScanMap";
import ScansOverview from "./ScansOverview";
import BoxInfo from './BoxInfo';

export default function BoxSummary({ boxes, scans, id, open, setOpen }) {

	function handleClose() {
		setOpen(false);
	}

	const boxData = boxes ? boxes.filter(box => { return box.id === id })[0] : null;
	const scanData = scans ? scans.filter(scan => { return scan.boxId === id }).sort((a, b) => b.time - a.time) : null;

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll='body'
			keepMounted={false}
			maxWidth='lg'
		>
			<DialogContent>
				<Typography
					variant='overline'
				>Box summary</Typography>
				<Stack direction={'row'} spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<BoxInfo boxData={boxData} />
						</Grid>
						{scanData && scanData.length ?
							<Grid item xs={12}>
								<ScansOverview boxes={boxes} scans={scanData} disableDialogs />
							</Grid>
							: null}
					</Grid>
					{scanData && scanData.length ? <Map scans={scanData} scansCount={scanData.length} /> : null}
				</Stack>
			</DialogContent>
		</Dialog >
	);
}
