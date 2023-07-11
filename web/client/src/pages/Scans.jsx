import React, {useContext} from 'react';
import ScansOverview from '../components/ScansOverview';
import { Box, Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import AppContext from '../context/AppContext';
import CachedIcon from '@mui/icons-material/Cached';

export default function Scans() {
	const { boxes, scans, fetchScans } = useContext(AppContext);
	return (
		<>
			<Helmet>
				<title>Scans - Track-and-Trace</title>
				<meta name="description" content="Track and trace packages with ease using our advanced web application. Stay updated on the status and location of your shipments in real-time. Effortlessly monitor delivery progress and gain peace of mind knowing where your packages are at all times." />
			</Helmet>
			<Grid
				container
				padding={3}
				spacing={2}
				alignItems='stretch'
			>
				<Grid item xs={12}>
					<Button
						variant='outlined'
						color='primary'
						fullWidth
						onClick={() => fetchScans(boxes)}
						size='large'
						startIcon={<CachedIcon />}
					>
						Refresh scans
					</Button>
				</Grid>
				<Grid item xs={12}>
					<ScansOverview boxes={boxes} scans={scans} />
				</Grid>
			</Grid>
		</>
	);
}
