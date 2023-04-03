import { Dialog, DialogContent, Card, Stack, Typography, CardContent } from "@mui/material";
import QRCode from "react-qr-code";
import { getBox } from "../service";
import { useEffect, useState } from "react";

export default function BoxSummary({ id, open, setOpen }) {
	const [boxData, setBoxData] = useState([]);

	function handleClose() {
		setOpen(false);
	}

	useEffect(() => {
		getBox(id)
			.then(setBoxData)
	}, [id, setBoxData])

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll='body'
			keepMounted={false}>
			<DialogContent>
				<Typography
					variant='overline'
				>Box summary</Typography>
				<Card>
					<CardContent>
						<Typography
							color="text.secondary"
							variant="overline"
						>Informations</Typography>
						<Stack direction={'row'} spacing={5} alignItems={'flex-start'}>
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
								<QRCode value={id} size={100} />
								<Typography fontFamily={'Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New'} fontSize={'.7rem'}>{id}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
				{/* <Card>
					<CardHeader title='Location summary' />
				</Card> */}
			</DialogContent>
		</Dialog>
	);
}
