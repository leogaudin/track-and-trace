import React, { useState } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { Button, Grid } from '@mui/material';
import Upload from '../components/Upload';
import { Helmet } from 'react-helmet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Boxes({ boxes, scans }) {
	const [uploadOpen, setUploadOpen] = useState(false);

	return (
		<>
			<Helmet>
				<title>Boxes - Track-and-Trace</title>
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
						onClick={setUploadOpen}
						size='large'
						startIcon={<CloudUploadIcon />}
					>
						Upload boxes from a distribution list
					</Button>
				</Grid>
				<Grid item xs={12}>
					<BoxesOverview boxes={boxes} scans={scans} />
				</Grid>
			</Grid>
			<Upload open={uploadOpen} setOpen={setUploadOpen} />
		</>
	);
}
