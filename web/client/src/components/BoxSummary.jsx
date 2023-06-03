import { useState } from "react";
import { Dialog, DialogContent, Stack, Typography, Grid, Alert, Button } from "@mui/material";
import Map from "./ScanMap";
import ScansOverview from "./ScansOverview";
import BoxInfo from './BoxInfo';
import { getProgress } from "../service/progress";
import { colorsMap, textsMap } from "./constants";
import ConfirmDialog from "./ConfirmDialog";
import { deleteBoxes } from "../service";

export default function BoxSummary({ boxes, scans, id, open, setOpen }) {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const boxData = boxes ? boxes.filter(box => { return box.id === id })[0] : null;
	const scanData = scans ? scans.filter(scan => { return scan.boxId === id }) : null;

	function handleClose() {
		setOpen(false);
	}

	function handleDelete() {
		setOpenDeleteDialog(true);
	}

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
						<Grid item xs={12}>
							<Button
								color="error"
								variant="outlined"
								onClick={handleDelete}
								fullWidth
							>
								Delete this box
							</Button>
						</Grid>
						{getProgress(scanData) !== 'noscans'
						? <Grid item xs={12}>
							<Alert
								variant="filled"
								severity={colorsMap[getProgress(scanData)]}
								sx={{color: 'white'}}
							>
								<b>{textsMap[getProgress(scanData)]}</b>
							</Alert>
						</Grid>
						: false}
						{scanData?.length ?
							<Grid item xs={12}>
								<ScansOverview boxes={boxes} scans={scanData} disableDialogs />
							</Grid>
							: null}
					</Grid>
					{scanData?.length ? <Map scans={scanData} scansCount={scanData.length} /> : null}
				</Stack>
				<ConfirmDialog
					open={openDeleteDialog}
					setOpen={setOpenDeleteDialog}
					message="Are you sure you want to proceed to the removal? This action cannot be undone."
					onConfirm={() => {
						deleteBoxes([boxData])
							.then(() => {
								window.location.reload();
							})
					}}
				/>
			</DialogContent>
		</Dialog >
	);
}
