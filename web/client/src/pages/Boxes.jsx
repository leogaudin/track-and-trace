import React, { useState } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { ButtonBase, Card, CardContent, Grid, Typography } from '@mui/material';
import Upload from '../components/Upload';
import { Helmet } from 'react-helmet';

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
					<Card>
						<ButtonBase
							style={{ width: '100%' }}
							onClick={setUploadOpen}
						>
							<CardContent>
								<Typography>
									Upload boxes from a CSV
								</Typography>
							</CardContent>
						</ButtonBase>
					</Card>
					<Upload open={uploadOpen} setOpen={setUploadOpen} />
				</Grid>
				<Grid item xs={12}>
					<BoxesOverview boxes={boxes} scans={scans} />
				</Grid>
			</Grid>
		</>
	);
}
