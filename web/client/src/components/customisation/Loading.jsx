import { CircularProgress, Stack, Typography } from "@mui/material"

export default function Loading() {
  return (
	<Stack
		sx={{
			color: 'grey.500',
			width: '100%',
			height: '100vh',
			paddingX: 10,
		}}
		direction="column"
		alignItems="center"
		justifyContent="center"
	>
	  <CircularProgress size={70}/>
	  <Typography fontSize={14} variant="overline" textAlign="center" marginTop={5} color="primary.dark">Loading your boxes...</Typography>
	</Stack>
  )
}
