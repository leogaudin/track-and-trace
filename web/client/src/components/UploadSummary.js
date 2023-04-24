import { Alert, Button, Stack, Typography } from "@mui/material";

export default function UploadSummary({ results, open, setOpen }) {
	return (
		<>
			<Stack direction={'column'} spacing={2}>
				<Typography textAlign={'center'} variant='overline'>Upload finished!</Typography>
				<Button
					variant={'contained'}
					color='success'
					onClick={() => {
						setOpen(false);
						window.location.reload();
					}}>
					Close
				</Button>
				<Typography textAlign={'center'} variant='overline'>Summary</Typography>
				<Stack direction={'row'} spacing={2} alignItems={'stretch'}>
					{
						results.hasOwnProperty('validBoxesToCreate') && results.validBoxesToCreate.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.validBoxesToCreate.map((box) => {
										return (
											<Alert key={box.id} severity={'success'}>
												Box n°{box.id} was successfully created.
											</Alert>
										);
									})}
								</Stack>
							) : null
					}
					{
						results.hasOwnProperty('invalidBoxes') && results.invalidBoxes.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.invalidBoxes.map((box) => {
										return (
											<Alert key={box.box.id} severity={'error'}>
												{box.error}
											</Alert>
										);
									})}
								</Stack>
							) : null
					}
				</Stack>
			</Stack>
		</>
	);
}
