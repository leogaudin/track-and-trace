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
						results.hasOwnProperty('valid') && results.valid.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.valid.map((box) => {
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
						results.hasOwnProperty('invalid') && results.invalid.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.invalid.map((box) => {
										return (
											<Alert key={box.instance.id} severity={'error'}>
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
